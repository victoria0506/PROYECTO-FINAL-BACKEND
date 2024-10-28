import { useEffect, useState } from "react";
import RestaGet from "../services/getRestaurant";
import "../style/cardRestaurantes.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CardsRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState([])
    const { t } = useTranslation();
    const obtenerRestaurant = async () => {
        const restaurantObte = await RestaGet();
        setRestaurantes(restaurantObte);
    };

    useEffect(() => {
        obtenerRestaurant()
    }, [])

    return (
        <div className="maincontainer">
            <h1>{t('Discover your next favorite restaurant.')}</h1>
            <div className="container-cards">
                {restaurantes.map((restau, index) => (
                    <div key={index}>
                        <article className="card">
                            <img
                                className="card__background"
                                src="/src/img/lasbrisasheader.jpeg"
                                alt={`Photo of ${restau.nombre_restaurante}`}
                            />
                            <img className="card__profile-icon" src="/src/img/images.jpg" alt="Restaurant Profile" />
                            <div className="card__content flow">
                                <div className="card__content--container flow">
                                    <h2 className="card__title">{restau.nombre_restaurante}</h2>
                                    <p className="card__description">
                                        <strong>{t('Specialty')}: </strong>{restau.especialidad}<br />
                                        <strong>{t('Rating')}: </strong>{restau.calificacion_promedio}<br />
                                        <strong>{t('Capacity')}: </strong>{restau.capacidad}<br />
                                    </p>
                                </div>
                                <button className="card__button">
                                    <Link to={`/Restaurant/${restau.restaurante_id}`}>{t('See more')}</Link>
                                </button>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardsRestaurantes;
