import { URLSearchParams } from "node:url";
import type { fetch as undiciFetch } from "undici";

// @types/node does not have the global fetch() type
declare const fetch: typeof undiciFetch;

/**
 * Translates text from one language to another, using Google Translate
 *
 * @param text - The text you wish to translate
 * @param targetLang - The target language
 * @param sourceLang - The source language
 */
export async function translate(text: string, targetLang: string, sourceLang = "auto"): Promise<Translation> {
	if (typeof text !== "string" || !text) throw new Error("The text was invalid");
	if (typeof targetLang !== "string" || !targetLang) throw new Error("The target language was invalid");

	const form = new URLSearchParams();

	form.append("sl", sourceLang);
	form.append("tl", targetLang);
	form.append("q", text);

	const searchParams = new URLSearchParams({
		client: "at",
		dj: "1",
		hl: targetLang,
		ie: "UTF-8",
		oe: "UTF-8",
		inputm: "2",
		otf: "2",
		iid: "1dd3b944-fa62-4b55-b330-74909a99969e",
	});

	// These have to be set separately because the URLSearchParams constructor doesn't work with duplicate keys properly
	const dtValues = ["t", "ld", "qca", "rm", "bd"];
	for (const value of dtValues) searchParams.append("dt", value);

	const response = await fetch(`https://translate.google.com/translate_a/single?${searchParams.toString()}`, {
		body: form,
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		method: "POST",
	});

	if (!response.ok) {
		if (response.status === 429) {
			throw new Error("You are being rate-limited by Google Translate");
		}

		throw new Error(`An error occurred while translating: ${response.statusText}`);
	}

	const data = (await response.json()) as GoogleResponse;

	return {
		translation: data.sentences.map((sentence) => sentence.trans).join(""),
		sourceLang: data.src,
		source: text,
		targetLang,
	};
}

export default translate;

export interface Translation {
	source: string;
	sourceLang: string;
	targetLang: string;
	translation: string;
}

interface GoogleResponse {
	confidence: number;
	dict: {
		base_form: string;
		entry: {
			reverse_translation: string[];
			score: number;
			word: string;
		}[];
		pos: string;
		pos_enum: number;
		terms: string[];
	}[];
	ld_result: {
		extended_srclangs: string[];
		srclangs: string[];
		srclangs_confidences: number[];
	};
	/* eslint-disable camelcase */
	sentences: {
		backend: number;
		orig: string;
		trans: string;
	}[];
	src: string;
	/* eslint-enable camelcase */
}
