import axios, { AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';

export interface ResolvableInput {
  text: string;
  source?: string;
  target: string;
}

export interface Translation {
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
}

export default class Translate {
  /**
   * @param {TranslateInput} input
   * @returns {Translation}
   */
  public static translate(input: ResolvableInput): Promise<Translation>

  /**
   * @param {ResolvableInputstring} input The text that you want to translate
   * @para targetLang The target language
   * @param {string} source The source language
   * @returns {Translation}
   */
  public static async translate(
    input: string | ResolvableInput,
    targetLang?: string,
    source?: string,
  ): Promise<Translation> {
    const text = typeof input === 'object' ? input.text : input;
    let target = targetLang;
    if (typeof text !== 'string') throw new Error('Your text input was invalid');
    if (!target && typeof input === 'object') target = input.target;
    if (!target) throw new Error('The target language was not valid');
    if (typeof input === 'object' && !source) source = input.source;

    const form = new URLSearchParams();

    if (source) form.append('sl', source);
    form.append('tl', target);
    form.append('q', text);

    const url = [
      'https://translate.google.com/translate_a/single',
      `?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=${target}&ie=UTF-8`,
      '&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e',
    ].join('');

    const res: AxiosResponse<Translation> = await axios(url, { method: 'POST', data: form });
    return res.data;
  }
}
