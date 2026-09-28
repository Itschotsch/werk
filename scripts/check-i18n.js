import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const frontendSrc = path.join(projectRoot, "frontend", "src");

function getSvelteFiles(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	for (const file of list) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat && stat.isDirectory()) {
			results = results.concat(getSvelteFiles(filePath));
		} else if (file.endsWith(".svelte")) {
			results.push(filePath);
		}
	}
	return results;
}

const svelteFiles = getSvelteFiles(frontendSrc);
let hasErrors = false;

for (const filePath of svelteFiles) {
	const relPath = path.relative(projectRoot, filePath);
	const content = fs.readFileSync(filePath, "utf-8");

	// 1. Check for suspicious static user-facing attributes: placeholder="...", alt="...", aria-label="..."
	const attrRegex = /\b(placeholder|alt|aria-label|title)\s*=\s*"([^"{}\\\n]+)"/gi;
	let match;
	
	// Helper to find line number from character index
	const getLineNumber = (idx) => {
		let line = 1;
		for (let i = 0; i < idx && i < content.length; i++) {
			if (content[i] === "\n") line++;
		}
		return line;
	};

	while ((match = attrRegex.exec(content)) !== null) {
		const attrName = match[1];
		const attrVal = match[2].trim();
		const lineNum = getLineNumber(match.index);

		// Ignore brand names or technical identifiers
		if (attrVal && attrVal !== "Werk" && /[a-zA-ZäöüßÄÖÜ]{2,}/.test(attrVal)) {
			console.error(
				`[i18n check] ${relPath}:${lineNum} - Hardcoded attribute '${attrName}="${attrVal}"'. Use i18n expression instead.`
			);
			hasErrors = true;
		}
	}

	// 2. Extract template portion (strip <script>, <style>, <!-- comments -->)
	let template = content
		.replace(/<script[\s\S]*?<\/script>/gi, (m) => "\n".repeat(m.split("\n").length - 1))
		.replace(/<style[\s\S]*?<\/style>/gi, (m) => "\n".repeat(m.split("\n").length - 1))
		.replace(/<!--[\s\S]*?-->/g, (m) => "\n".repeat(m.split("\n").length - 1));

	// Strip Svelte expressions {...} (including multiline)
	// We handle nested braces simply or iteratively
	let prevTemplate = "";
	while (template !== prevTemplate) {
		prevTemplate = template;
		template = template.replace(/\{[^{}]*\}/g, (m) => " ".repeat(m.length));
	}

	// Strip HTML tags <...> (including multiline)
	template = template.replace(/<[^>]*>/g, (m) => " ".repeat(m.length));

	// Now check remaining text nodes line by line
	const templateLines = template.split("\n");
	templateLines.forEach((lineText, idx) => {
		const lineNum = idx + 1;
		const trimmed = lineText.trim();

		// Check if trimmed line contains words
		if (trimmed && /[a-zA-ZäöüßÄÖÜ]{2,}/.test(trimmed)) {
			// Ignore brand names, symbols, or URL-like strings
			if (
				trimmed !== "Werk" &&
				trimmed !== "| Werk" &&
				trimmed !== "|" &&
				trimmed !== ":" &&
				!trimmed.startsWith("@") &&
				!trimmed.startsWith("#") &&
				!trimmed.startsWith("http") &&
				!trimmed.includes("werk.ch")
			) {
				console.error(
					`[i18n check] ${relPath}:${lineNum} - Hardcoded text node: "${trimmed}". Wrap in i18n expression.`
				);
				hasErrors = true;
			}
		}
	});
}

if (hasErrors) {
	console.error("\n❌ i18n check failed: Found hardcoded text in Svelte files.");
	process.exit(1);
} else {
	console.log("✅ i18n check passed: No hardcoded UI text found in Svelte files.");
}
