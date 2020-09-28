import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslations from '../utils/locale/es/translation.json';

const resources = {
  es: { translation: esTranslations }
};

const defaultLng = 'es'
export const initialize = () =>
  i18n.use(initReactI18next).init({
    resources,
    lng: 'es',
    fallbackLng: defaultLng,
    interpolation: {
      escapeValue: false
    }
  });

initialize();

export default i18n;