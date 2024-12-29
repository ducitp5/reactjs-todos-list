import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: require('locales/en/translation.json'),
        },
        vi: {
            translation: require('locales/vi/translation.json'),
        },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
        escapeValue: false, // React already escapes content
    },
});

export default i18n;
