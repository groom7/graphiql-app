import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEnglish from './utils/translation/english/translation.json';
import translationRussian from './utils/translation/russian/translation.json';

export const defaultNS = 'ns1';
export const resources = {
  en: {
    translation: translationEnglish,
  },
  ru: {
    translation: translationRussian,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18next;
