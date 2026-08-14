import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "settings": "Settings",
      "account": "Account",
      "privacy": "Privacy",
      "app_language": "App Language",
      "refer_friend": "Refer A Friend"
    }
  },
  bn: {
    translation: {
      "settings": "সেটিংস",
      "account": "অ্যাকাউন্ট",
      "privacy": "গোপনীয়তা",
      "app_language": "অ্যাপের ভাষা",
      "refer_friend": "বন্ধুকে রেফার করুন"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;