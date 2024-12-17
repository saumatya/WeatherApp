import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationFI from './locales/fi/translation.json';
import translationSV from './locales/sv/translation.json';

const resources = {
  en: { translation: translationEN },
  fi: { translation: translationFI },
  sv: { translation: translationSV },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) 
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
