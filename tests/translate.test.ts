import { describe, it, expect } from "vitest";
import { translate } from "../src";

describe("translate()", () => {
	it("should reject when invalid arguments are passed", async () => {
		// @ts-expect-error: Invalid usages
		await expect(() => translate()).rejects.toStrictEqual(new Error("The text was invalid"));
		// @ts-expect-error: Invalid usages
		await expect(() => translate("")).rejects.toStrictEqual(new Error("The text was invalid"));

		await expect(() => translate("Hello", "")).rejects.toStrictEqual(new Error("The target language was invalid"));
	});

	it("should translate when source language is not provided", async () => {
		await expect(translate("Hello", "pt").then((res) => res.translation)).resolves.toEqual("Olá");
	});

	it("should translate when source language is provided", async () => {
		await expect(translate("Hello", "pt", "en").then((res) => res.translation)).resolves.toEqual("Olá");
	});

	it("should translate multiple sentences", async () => {
		await expect(translate("Hello. How are you?", "pt", "en").then((res) => res.translation)).resolves.toEqual(
			"Olá. Como você está?",
		);
	});
});
