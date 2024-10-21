import { useState } from 'react';
import '../style/Quiz.css';
import { motion } from 'framer-motion';

const Quiz = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState([]);
    const [quizFinished, setQuizFinished] = useState(false);

    const questions = [
        {
            question: "¿Cuál es tu tipo de platillo favorito?",
            options: [
                "Tradicional Costarricense",
                "Rápido",
                "Pizza",
                "Gourmet",
                "Internacional",
                "Postres",
            ],
        },
        {
            question: "¿Prefieres algo dulce o salado?",
            options: ["Dulce", "Salado"],
        },
        {
            question: "¿Te gusta el picante?",
            options: ["Sí", "No"],
        },
        {
            question: "¿Tienes alguna preferencia dietética?",
            options: ["Vegano", "Vegetariano", "Carnívoro", "Sin Preferencias"],
        },
    ];

    const restaurants = {
        "Tradicional Costarricense": ["Restaurante Tico", "Soda El Buen Sabor"],
        "Rápido": ["Fast Food Costa Rica", "Burger House"],
        "Pizza": ["Pizzería La Italiana", "Pizza a la Leña"],
        "Gourmet": ["Gourmet del Mar", "Fine Dining CR"],
        "Internacional": ["El Mundo en tu Plato", "Cocina Internacional"],
        "Postres": ["Dulces y Más", "Helados Artesanales"],
        "Dulce": ["Dulces y Más", "Helados Artesanales"],
        "Salado": ["Restaurante Tico", "Soda El Buen Sabor"],
        "Sí": ["Restaurante Picante", "Salsa y Picante"],
        "No": ["Restaurante Sin Picante", "Comidas Suaves"],
        "Vegano": ["Vegano CR", "Café Plant Based"],
        "Vegetariano": ["Cocina Vegetariana", "El Huerto"],
        "Carnívoro": ["Parrilla CR", "Asados del Campo"],
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentQuestion(0);
        setAnswers({});
        setResults([]);
        setQuizFinished(false);
    };

    const handleOptionChange = (option) => {
        setAnswers({
            ...answers,
            [currentQuestion]: option,
        });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const result = [];
            Object.values(answers).forEach((answer) => {
                if (restaurants[answer]) {
                    result.push(...restaurants[answer]);
                }
            });
            setResults(result);
            setQuizFinished(true);
        }
    };

    return (
        <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }} // Allows the animation to trigger each time the element comes into view
      >
        <div className="quiz-container">
            <h1 className="quiz-title">Descubre tu lugar ideal</h1>
            <p className="quiz-description">
                Responde estas preguntas rápidas y te daremos recomendaciones personalizadas.
            </p>
            <button className="quiz-button" onClick={handleOpenModal}>
                ¡Haz el Quiz!
            </button>

            {modalOpen && (
                <>
                    <div className="quiz-backdrop" onClick={handleCloseModal}></div>
                    <div className="quiz-modal">
                        {!quizFinished ? (
                            <>
                                <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
                                {questions[currentQuestion].options.map((option, index) => (
                                    <label className="quiz-option" key={index}>
                                        <input
                                            type="radio"
                                            name="question"
                                            value={option}
                                            onChange={() => handleOptionChange(option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                                <button className="quiz-next-button" onClick={handleNext}>
                                    {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Finalizar'}
                                </button>
                                <button className="quiz-close-button" onClick={handleCloseModal}>Cerrar</button>
                            </>
                        ) : (
                            <>
                                <h2 className="quiz-results-title">Te recomendamos:</h2>
                                {results.length > 0 ? (
                                    results.map((restaurant, index) => (
                                        <div className="quiz-result-card" key={index}>
                                            <h3 className="quiz-result-restaurant">{restaurant}</h3>
                                            <a
                                                className="quiz-result-link"
                                                href={`/${restaurant.toLowerCase().replace(/\s+/g, '-')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Ver más
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p>No se encontraron recomendaciones.</p>
                                )}
                                <button className="quiz-close-button" onClick={handleCloseModal}>Cerrar</button>
                            </>
                        )}
                        
                    </div>
                </>
            )}
        </div>
        </motion.div>
    );
    
};

export default Quiz;



