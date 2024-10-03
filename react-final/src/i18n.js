// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          help: "Help",
          login: "Login",
          home: "Home",
          discover: "Discover",
          contact: "Contact",
          search: "Search",
          "about us": "About Us",
        },
      },
      es: {
        translation: {
          help: "Ayuda",
          login: "Acceder",
          home: "Inicio",
          discover: "Descubre",
          contact: "Contacto",
          search: "Buscar",
          "about us": "Sobre Nosotros",
        },
      },
    },
    lng: 'es', // Idioma inicial
    fallbackLng: 'es', // Idioma de respaldo
    interpolation: {
      escapeValue: false, // React ya hace el escape
    },
  });

export default i18n;

