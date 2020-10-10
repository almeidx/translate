import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';

interface GoogleResponse {
  /* eslint-disable camelcase */
  sentences: {
    trans: string;
    orig: string;
    backend: number;
  }[];
  dict: {
    pos: string;
    terms: string[];
    entry: {
      word: string;
      reverse_translation: string[];
      score: number;
    }[];
    base_form: string;
    pos_enum: number;
  }[];
  src: string;
  confidence: number;
  ld_result: {
    srclangs: string[];
    srclangs_confidences: number[];
    extended_srclangs: string[];
  };
  /* eslint-enable camelcase */
}

export interface Translation {
  translation: string;
  sourceLang: string;
  source: string;
  targetLang: string;
}

/**
 * @param {string} text The text you wish to translate
 * @param {string} targetLang The target language
 * @param {string} sourceLang The source language
 * @returns {Promise<Translation>}
 */
export const translate = async (
  text: string,
  targetLang: string,
  sourceLang: string = 'auto',
): Promise<Translation> => {
  if (typeof text !== 'string' || !text) return Promise.reject(new Error('The text was invalid'));
  if (typeof targetLang !== 'string' || !targetLang) {
    return Promise.reject(new Error('The target language was invalid'));
  }

  const form = new URLSearchParams();

  form.append('sl', sourceLang);
  form.append('tl', targetLang);
  form.append('q', text);

  const url = [
    'https://translate.google.com/translate_a/single',
    `?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=${targetLang}&ie=UTF-8`,
    '&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e',
  ].join('');

  const res: AxiosResponse<GoogleResponse> = await axios(url, { method: 'POST', data: form });

  return {
    translation: res.data.sentences[0].trans,
    sourceLang: res.data.src,
    source: text,
    targetLang,
  };
};

export default translate;
