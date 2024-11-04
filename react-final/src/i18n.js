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
          "Restaurant name" : "Restaurant name",
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
          "About Us": "About Us",
          "Charging...  ": "Cargando",
          "Would you like to discover new restaurants?": "Would you like to discover new restaurants?",
          "Explore different options and choose the one you like the most.": "Explore different options and choose the one you like the most.",
          "Enjoy the search!": "Enjoy the search!",
          "See more": "See more",
          "What's Your Favorite Food? Find the Perfect Restaurant:" : "What's Your Favorite Food? Find the Perfect Restaurant:",
          "STAR DISH": "STAR DISH",
          "If you're unsure about what to eat, take a look at these selected dishes from our best restaurants.":"If you're unsure about what to eat, take a look at these selected dishes from our best restaurants.",
          "Highlights and Favorites" : "Highlights and Favorites",
          "Discover Your Ideal Place":"Discover Your Ideal Place",
          "Answer these quick questions and we'll give you personalized recommendations.":"Answer these quick questions and we'll give you personalized recommendations.",
          "Take the Quiz!": "Take the Quiz!",
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
          "About Us": "Sobre Nosotros",
          "Charging...": "Cargando", 
          "Would you like to discover new restaurants?": "¿Te gustaría conocer nuevos restaurantes?",
          "Explore different options and choose the one you like the most.": "Explora diferentes opciones y elige la que más te guste.",
          "Enjoy the search!": "¡Disfruta de la búsqueda!",
          "See more" : "Ver más",
          "What's Your Favorite Food? Find the Perfect Restaurant:": "¿Cuál es Tu Comida Favorita? Encuentra el Restaurante Perfecto:",
          "STAR DISH": "PLATO ESTRELLA",
          "If you're unsure about what to eat, take a look at these selected dishes from our best restaurants.": "Si estás en duda sobre qué comer, echa un vistazo a estos platos seleccionados de nuestros mejores restaurantes.",
          "Highlights and Favorites": "Destacados y favoritos",
          "Discover Your Ideal Place": "Descubre tu lugar ideal",
          "Answer these quick questions and we'll give you personalized recommendations.": "Responde estas preguntas rápidas y te daremos recomendaciones personalizadas.",
          "Take the Quiz!": "¡Haz el Quiz!",
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

