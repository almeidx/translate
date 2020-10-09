import translate from '..';

describe('translate()', () => {
  it('should reject when invalid arguments are passed', () => {
    // @ts-ignore
    expect(translate().catch((err) => err.message)).resolves.toBe('The text was invalid');
    // @ts-ignore
    expect(translate('').catch((err) => err.message)).resolves.toBe('The text was invalid');
    expect(translate('Hello', '').catch((err) => err.message)).resolves.toBe('The target language was invalid');
  });

  it('should translate when source language is not provided', () => {
    expect(translate('Hello', 'pt').then((res) => res.translation)).resolves.toBe('Olá');
  });

  it('should translate when source language is provided', () => {
    expect(translate('Hello', 'pt', 'en').then((res) => res.translation)).resolves.toBe('Olá');
  });
});
