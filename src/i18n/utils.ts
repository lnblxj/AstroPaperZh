import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: keyof typeof ui) {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

export function getBrowserLanguage(): keyof typeof ui {
  if (typeof window === "undefined") return defaultLang;

  const browserLang = navigator.language.split("-")[0];
  return browserLang in ui ? (browserLang as keyof typeof ui) : defaultLang;
}
