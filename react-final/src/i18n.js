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
          "RestaurApp was born with the goal of connecting people with the incredible diversity of restaurants in Puntarenas. We want both residents and tourists to enjoy the culinary offerings of the region, from small family-run establishments to well-known restaurants." : 
          "RestaurApp was born with the goal of connecting people with the incredible diversity of restaurants in Puntarenas. We want both residents and tourists to enjoy the culinary offerings of the region, from small family-run establishments to well-known restaurants.",
          "Our platform allows you to search and discover the places that best fit your preferences. Let’s support the culinary community together while enjoying the best it has to offer!" : "Our platform allows you to search and discover the places that best fit your preferences. Let’s support the culinary community together while enjoying the best it has to offer!",
          "Join us and explore the unique flavors that only Puntarenas can offer. Your next culinary experience is just a click away!" : "Join us and explore the unique flavors that only Puntarenas can offer. Your next culinary experience is just a click away!",
          "About RestaurApp" : "About RestaurApp",
          "Information" : "Information",
          "Menu": "Menu",
          "Location" : "Location",
          "Calendar" : "Calendar",
          "errorAddingRestaurant": "There was an error adding the restaurant. Please try again.",
          "confirmAddToFavorites": "Do you want to add this restaurant to your favorites?",
          "restaurantAddedToFavorites": "Restaurant added to favorites.",
          "loginToAddFavorites": "Register or log in if you want to add to favorites.",
          "enterCorrectData": "Please enter your information correctly.",
          "welcomeAdmin": "Welcome, Administrator",
          "userNotFound": "User not found in the database",
          "incorrectEmailPassword": "Incorrect email or password",
          "authError": "An error occurred during authentication",
          "loginSuccess": "Login Successful",
          "fillAllDataCorrectly": "Please fill in all data correctly, including a valid email and a password of at least 5 characters.",
          "registrationSuccessful": "Registration successful",
          "userAlreadyRegistered": "The email or username is already registered",
          "There are no associated restaurants for this specialty." : "There are no associated restaurants for this specialty.",
          "User not found.":"User not found.",
          "loading..." : "loading...",
          "Save Featured Dish" : "Save Featured Dish",
          "Enter all data correctly": "Enter all data correctly",
          "Average price and capacity must be valid numbers": "Average price and capacity must be valid numbers",
          "Latitude and longitude must be valid values": "Latitude and longitude must be valid values",
          "Restaurant added successfully": "Restaurant added successfully",
          "Error adding restaurant": "Error adding restaurant",
          "Error uploading image. Please try again.": "Error uploading image. Please try again.",
          "Restaurant name": "Restaurant name",
          "Average price": "Average price",
          "Capacity": "Capacity",
          "RestaurApp All rights reserved.": "RestaurApp All rights reserved.",
          "Contact Us" : "Contact Us",
          "High Demand Calendar": "High Demand Calendar",
          "There are no events available in the calendar." : "There are no events available in the calendar.",
          "Low demand" : "Low demand",
          "High demand" : "High demand",
          "Closed" : "Closed",
          "Available" : "Available",
          "Add restaurant" : "Add restaurant",
          "District" : "District",
          "Cantons":"Cantons",
          "Select a district" : "Select a district",
          "Enter the Longitude" : "Enter the Longitude",
          "Longitude" : "Longitude",
          "Latitude": "Latitude",
          "Enter the latitude": "Enter the latitude",
          "Opening hours": "Opening hours",
          "Closing hours": "Closing hours",
          "Upload profile image": "Upload profile image",
          "Upload header image" : "Upload header image",
          "Image 1 :" : "Image 1 :",
          "Image 2 :" : "Image 2 :",
          "Image 3 :" : "Image 3 :",
          "Image 4 :" : "Image 4 :",
          "Deactivate": "Deactivate",
          "Description" : "Description"

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
          "RestaurApp was born with the goal of connecting people with the incredible diversity of restaurants in Puntarenas. We want both residents and tourists to enjoy the culinary offerings of the region, from small family-run establishments to well-known restaurants." :
          "RestaurApp nació con el objetivo de conectar a las personas con la increíble diversidad de restaurantes en Puntarenas. Queremos que tanto residentes como turistas disfruten de la oferta gastronómica de la región, desde pequeños locales familiares hasta reconocidos restaurantes.",
          "Our platform allows you to search and discover the places that best fit your preferences. Let’s support the culinary community together while enjoying the best it has to offer!" : "Nuestra plataforma te permite buscar y descubrir los lugares que mejor se adapten a tus preferencias. ¡Apoyemos juntos a la comunidad gastronómica mientras disfrutamos de lo mejor que tiene para ofrecer!",
          'Join us and explore the unique flavors that only Puntarenas can offer. Your next culinary experience is just a click away!' : "Nuestra plataforma te permite buscar y descubrir los lugares que mejor se adapten a tus preferencias. ¡Apoyemos juntos a la comunidad gastronómica mientras disfrutamos de lo mejor que tiene para ofrecer!",
          "About RestaurApp" : "Sobre RestaurApp",
          "Information" : "Informacion",
          "Menu" : "Menú",
          "Location" : "Ubicación",
          "Calendar" : "Calendario",
          "errorAddingRestaurant": "Hubo un error al añadir el restaurante. Por favor, inténtelo de nuevo.",
          "confirmAddToFavorites": "¿Deseas añadir este restaurante a tus favoritos?",
          "restaurantAddedToFavorites": "Restaurante añadido a favoritos.",
          "loginToAddFavorites": "Deseas añadir este Restaurante a favoritos?",
          "enterCorrectData": "Ingrese sus datos de manera correcta",
          "welcomeAdmin": "Bienvenido Administrador",
          "userNotFound": "Usuario no encontrado en la base de datos",
          "incorrectEmailPassword": "Correo o/y Contraseña incorrectas",
          "authError": "Ocurrió un error en la autenticación",
          "loginSuccess": "Logueo Exitoso",
          "fillAllDataCorrectly": "Ingrese todos los datos correctamente, incluyendo un correo válido y una contraseña de al menos 5 caracteres.",
          "registrationSuccessful": "Registro exitoso",
          "userAlreadyRegistered": "El correo o el nombre de usuario ya están registrados",
          "There are no associated restaurants for this specialty." : "No hay restaurantes asociados para esta especialidad.",
          "User not found." :"No se encontró el usuario.",
          "loading..." : "Cargando...",
          "Save Featured Dish" : "Guardar platillo destacado",
          "Enter all data correctly": "Ingrese todos los datos de manera correcta",
          "Average price and capacity must be valid numbers": "El precio promedio y la capacidad deben ser números válidos",
          "Latitude and longitude must be valid values": "Latitud y longitud deben ser valores válidos",
          "Restaurant added successfully": "Restaurante añadido exitosamente",
          "Error adding restaurant": "Ocurrió un error al añadir el restaurante",
          "Error uploading image. Please try again.": "Error al subir la imagen. Por favor, inténtelo de nuevo.",
          "Restaurant name": "Nombre del restaurante",
          "Precio promedio": "Precio promedio",
          "Capacity": "Capacidad",
          "Descripción": "Descripción",
          "Especialidad": "Especialidad",
          "Cantones": "Cantones",
          "Seleccione un cantón": "Seleccione un cantón",
          "Distrito": "Distrito",
          "Select a district": "Seleccione un distrito",
          "Latitude": "Latitud",
          "Enter the latitude": "Ingrese la latitud",
          "Longitude": "Longitud",
          "Enter the Longitude": "Ingrese la longitud",
          "Upload profile image": "Subir imagen de perfil",
          "Upload header image": "Subir imagen de encabezado",
          "Add restaurant": "Añadir restaurante",
          "RestaurApp All rights reserved." : "RestaurApp Todos los derechos reservados.",
          "Contact Us" : "Contactanos",
          "High Demand Calendar" : "Calendario de Alta Demanda",
          "There are no events available in the calendar." : "No hay eventos disponibles en el calendario.",
          "Low demand" : "Baja demanda",
          "High demand" : "Alta demanda",
          "Closed" : "Cerrado",
          "Available" : "Disponible",
          "District" : "Distrito",
          "Cantons" : "Cantones",
          "Longitude": "Longitud",
          "Opening hours" : "Horario de apertura",
          "Closing hours" : "Horario de cierre",
          "Image 1 :" : "Imagen 1 :",
          "Image 2 :" : "Imagen 2 :",
          "Image 3 :" : "Imagen 3 :",
          "Image 4 :" : "Imagen 4 :",
          "Deactivate" : "Desactivar",
          "Description" : "Descripción"
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

