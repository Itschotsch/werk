import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig(
	// Global ignores
	{
		ignores: [
			"**/node_modules/**",
			"**/dist/**",
			"**/build/**",
			"**/.svelte-kit/**",
			"**/data/**",
			"**/*.log"
		]
	},

	// Base JS recommendations
	js.configs.recommended,

	// TypeScript strict and stylistic rule sets
	...ts.configs.strict,
	...ts.configs.stylistic,

	// General TypeScript configuration
	{
		files: ["**/*.ts", "**/*.js"],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.browser
			}
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
			],
			"@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
			eqeqeq: ["error", "always"],
			"no-var": "error",
			"prefer-const": "error"
		}
	},

	// Svelte configuration
	...svelte.configs["flat/recommended"],
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			},
			globals: {
				...globals.browser
			}
		},
		rules: {
			"svelte/no-at-html-tags": "error",
			"svelte/valid-compile": "error"
		}
	},

	// Prettier config disables all conflicting styling rules
	prettier
);
