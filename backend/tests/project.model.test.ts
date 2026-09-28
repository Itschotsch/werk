import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { buildPartialDate, formatPartialDate } from "../src/utils/date.js";

describe("Project Date Utilities (node:test)", () => {
	test("buildPartialDate creates default timestamp and respects fields", () => {
		const pd = buildPartialDate({ year: 2026, month: 9, day: 24, hour: 20, minute: 40 });
		assert.equal(pd.year, 2026);
		assert.equal(pd.month, 9);
		assert.equal(pd.day, 24);
		assert.equal(pd.hour, 20);
		assert.equal(pd.minute, 40);
		assert.ok(pd.timestamp instanceof Date);
	});

	test("formatPartialDate formats year-only correctly", () => {
		const pd = buildPartialDate({ year: 2026 });
		assert.equal(formatPartialDate(pd, "de"), "2026");
		assert.equal(formatPartialDate(pd, "en"), "2026");
	});

	test("formatPartialDate formats year and month correctly", () => {
		const pd = buildPartialDate({ year: 2026, month: 9 });
		assert.equal(formatPartialDate(pd, "de"), "September 2026");
		assert.equal(formatPartialDate(pd, "en"), "September 2026");
		assert.equal(formatPartialDate(pd, "fr"), "septembre 2026");
	});

	test("formatPartialDate formats full date with time correctly", () => {
		const pd = buildPartialDate({ year: 2026, month: 9, day: 24, hour: 20, minute: 40 });
		assert.equal(formatPartialDate(pd, "de"), "24. September 2026, 20:40");
		assert.equal(formatPartialDate(pd, "en"), "24. September 2026, 20:40");
	});
});
