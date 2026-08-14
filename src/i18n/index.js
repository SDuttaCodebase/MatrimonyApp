import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// This is where you will eventually add all your app's text!
const resources = {
  en: {
    translation: {
      "app_language": "App Language",
      "settings": "Settings",
      // Add more English words here later
    }
  },
  bn: {
    translation: {
      "app_language": "অ্যাপের ভাষা",
      "settings": "সেটিংস",
      // Add more Bengali words here later
    }
  },
  hi: {
    translation: {
      "app_language": "ऐप की भाषा",
      "settings": "सेटिंग्स",
    }
  }
  // You can add mr (Marathi), gu (Gujrati), etc., following this pattern
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