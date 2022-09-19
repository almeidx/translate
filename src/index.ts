import { URLSearchParams } from "node:url";
import fetch from "node-fetch";

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

	const url =
		"https://translate.google.com/translate_a/single" +
		`?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=${targetLang}&ie=UTF-8` +
		"&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";

	const response = await fetch(url, {
		body: form,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		method: "POST",
	});

	const data = (await response.json()) as GoogleResponse;

	return {
		translation: data.sentences.map((sentence) => sentence.trans).join(""),
		sourceLang: data.src,
		source: text,
		targetLang,
	};
}

export default translate;

type GoogleResponse = {
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
};

export type Translation = {
	source: string;
	sourceLang: string;
	targetLang: string;
	translation: string;
};
