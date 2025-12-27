import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  en: {
    translation: {
      "app.title": "Cortex View",
      "nav.home": "Home",
      "nav.settings": "Settings",
      "nav.about": "About",
      "theme.toggle": "Toggle theme",
      "lang.en": "English",
      "lang.es": "Spanish",
    },
  },
  es: {
    translation: {
      "app.title": "Vista Cortex",
      "nav.home": "Inicio",
      "nav.settings": "Ajustes",
      "nav.about": "Acerca de",
      "theme.toggle": "Cambiar tema",
      "lang.en": "Inglés",
      "lang.es": "Español",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
