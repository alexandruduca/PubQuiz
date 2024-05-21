import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { Languages } from './types/common';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: Languages.ro,
    detection: {
      order: ['queryString', 'localStorage'],
    },
    ns: 'home',
  });
export default i18n;
