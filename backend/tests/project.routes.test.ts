import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import fastify from "fastify";
import mongoose from "mongoose";
import { User } from "../src/models/User.js";
import { Project } from "../src/models/Project.js";
import { Session } from "../src/models/Session.js";
import { authRoutes } from "../src/routes/auth.routes.js";
import { userRoutes } from "../src/routes/user.routes.js";
import { projectRoutes } from "../src/routes/project.routes.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/werk_test";

describe("Project REST Routes & Backlinks Integration", () => {
	const app = fastify();
	let leaderToken = "";
	let participantToken = "";

	before(async () => {
		await mongoose.connect(MONGODB_URI);
		await User.deleteMany({});
		await Project.deleteMany({});
		await Session.deleteMany({});

		await app.register(authRoutes, { prefix: "/api/auth" });
		await app.register(userRoutes, { prefix: "/api/users" });
		await app.register(projectRoutes, { prefix: "/api/projects" });

		// Register Leader user
		const leaderRes = await app.inject({
			method: "POST",
			url: "/api/auth/register",
			payload: {
				email: "leader@example.com",
				username: "leader",
				displayName: "Leader User",
				password: "Password123!"
			}
		});
		const leaderBody = JSON.parse(leaderRes.body);
		leaderToken = leaderBody.token;

		// Register Participant user
		const partRes = await app.inject({
			method: "POST",
			url: "/api/auth/register",
			payload: {
				email: "participant@example.com",
				username: "participant",
				displayName: "Participant User",
				password: "Password123!"
			}
		});
		const partBody = JSON.parse(partRes.body);
		participantToken = partBody.token;
	});

	after(async () => {
		await User.deleteMany({});
		await Project.deleteMany({});
		await Session.deleteMany({});
		await mongoose.disconnect();
	});

	let projectId = "";

	test("POST /api/projects creates a new project", async () => {
		const res = await app.inject({
			method: "POST",
			url: "/api/projects",
			headers: { authorization: `Bearer ${leaderToken}` },
			payload: {
				title: "Kollaborativer Kurzfilm Zurich",
				description: "Ein Kurzfilm-Projekt in Zürich",
				tags: ["Film", "Zurich", "Drama"]
			}
		});

		assert.equal(res.statusCode, 201);
		const body = JSON.parse(res.body);
		assert.ok(body.project);
		assert.equal(body.project.title, "Kollaborativer Kurzfilm Zurich");
		assert.ok(body.project.id);
		projectId = body.project.id;
	});

	test("GET /api/projects lists public projects", async () => {
		const res = await app.inject({
			method: "GET",
			url: "/api/projects"
		});

		assert.equal(res.statusCode, 200);
		const body = JSON.parse(res.body);
		assert.ok(Array.isArray(body.projects));
		assert.equal(body.projects.length, 1);
		assert.equal(body.projects[0].id, projectId);
	});

	test("POST /api/projects/:id/participants fails for non-existent username", async () => {
		const res = await app.inject({
			method: "POST",
			url: `/api/projects/${projectId}/participants`,
			headers: { authorization: `Bearer ${leaderToken}` },
			payload: {
				usernameOrEmail: "nonexistentuser123",
				role: "Sound Design"
			}
		});

		assert.equal(res.statusCode, 404);
		const body = JSON.parse(res.body);
		assert.equal(body.error, "USER_NOT_FOUND");
	});

	test("POST /api/projects/:id/participants adds a pending participant", async () => {
		const res = await app.inject({
			method: "POST",
			url: `/api/projects/${projectId}/participants`,
			headers: { authorization: `Bearer ${leaderToken}` },
			payload: {
				usernameOrEmail: "participant",
				role: "Director of Photography"
			}
		});

		assert.equal(res.statusCode, 201);
		const body = JSON.parse(res.body);
		assert.ok(Array.isArray(body.participants));
		const added = body.participants.find(
			(p: { role: string; status: string }) => p.role === "Director of Photography"
		);
		assert.ok(added);
		assert.equal(added.status, "pending");
	});

	test("GET /api/users/:username resolves pending project backlinks", async () => {
		const res = await app.inject({
			method: "GET",
			url: "/api/users/participant"
		});

		assert.equal(res.statusCode, 200);
		const body = JSON.parse(res.body);
		assert.ok(Array.isArray(body.projects));
		assert.equal(body.projects.length, 1);
		assert.equal(body.projects[0].status, "pending");
	});

	test("PATCH /api/projects/credits/:projectId confirms tagged credit", async () => {
		const res = await app.inject({
			method: "PATCH",
			url: `/api/projects/credits/${projectId}`,
			headers: { authorization: `Bearer ${participantToken}` },
			payload: { action: "confirm" }
		});

		assert.equal(res.statusCode, 200);
		const body = JSON.parse(res.body);
		assert.equal(body.status, "confirmed");
	});

	test("GET /api/users/:username resolves project backlinks", async () => {
		const res = await app.inject({
			method: "GET",
			url: "/api/users/participant"
		});

		assert.equal(res.statusCode, 200);
		const body = JSON.parse(res.body);
		assert.ok(Array.isArray(body.projects));
		assert.equal(body.projects.length, 1);
		assert.equal(body.projects[0].id, projectId);
		assert.equal(body.projects[0].role, "Director of Photography");
	});

	test("POST /api/projects/:id/logs adds a log entry with PartialDate", async () => {
		const res = await app.inject({
			method: "POST",
			url: `/api/projects/${projectId}/logs`,
			headers: { authorization: `Bearer ${participantToken}` },
			payload: {
				title: "Tag 1: Kamera-Check in Zürich",
				text: "Ausrüstung getestet und bereit für den Dreh.",
				year: 2026,
				month: 9,
				day: 24,
				hour: 20,
				minute: 45,
				locationName: "Studio Zurich"
			}
		});

		assert.equal(res.statusCode, 201);
		const body = JSON.parse(res.body);
		assert.ok(Array.isArray(body.logEntries));
		assert.equal(body.logEntries[0].title, "Tag 1: Kamera-Check in Zürich");
		assert.equal(body.logEntries[0].location.name, "Studio Zurich");
	});
});
