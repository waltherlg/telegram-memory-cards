export enum SupportedLang {
  RU = 'ru',
  EN = 'en',
}

const SUPPORTED_LANGUAGES = Object.values(SupportedLang) as SupportedLang[];

export function telegramLangSelector(incomeLang?: string): SupportedLang {
  const rawLang = incomeLang || 'en';
  const baseLang = rawLang.split('-')[0];

  if (SUPPORTED_LANGUAGES.includes(baseLang as SupportedLang)) {
    return baseLang as SupportedLang;
  }

  return SupportedLang.EN;
}
