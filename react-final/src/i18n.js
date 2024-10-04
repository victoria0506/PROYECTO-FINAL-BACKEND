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
          "Restaurant name" : "Restaurnat name",
          Ability: "Ability",
          Specialty: "Specialty",
          "Average price": "Average price",
          Add: "Add",
          User: "User", 
          Restaurant: "Restaurant",
          Email: "Email",
          Password: "Password",
          "You dont have an account?": "You dont have an account?",
          Register: "Register",
          "Register User": "Register User",
          "Do you have an account?": "Do you have an account?",
          Edit: "Edit",
          Eliminate: "Eliminate",
          "Discover your next favorite restaurant." : "Discover your next favorite restaurant.",
          Qualification:"Qualification",
          "About Us": "About Us"
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
          "Restaurant name": "Nombre restaurante",
          Ability: "Capacidad",
          Specialty: "Especialidad",
          "Average price" : "Precio promedio",
          Add: "Agregar",
          User: "Usuario",
          Restaurant: "Restaurante",
          Email: "Correo",
          Password: "Contraseña",
          "You dont have an account?": "No tienes una cuenta?",
          Register: "Registro",
          "Register User": "Registrar Usuario",
          "Do you have an account?": "Tienes una cuenta?",
          Edit: "Editar",
          Eliminate: "Eliminar",
          "Discover your next favorite restaurant." :"Descubre tu próximo restaurante favorito.",
          Qualification:"Calificacion",
          "About Us": "Sobre Nosotros"
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

