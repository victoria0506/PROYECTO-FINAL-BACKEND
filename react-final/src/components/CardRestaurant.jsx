import { useEffect, useState } from "react";
import RestaGet from "../services/getRestaurant";
import "../style/cardRestaurantes.css"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CardsRestaurantes = () => {
    const navigate = useNavigate();
    const [restaurantes, setRestaurantes] = useState([])
    const { t } = useTranslation();

    const obtenerRestaurant = async () => {
        const restaurantObte = await RestaGet()
        setRestaurantes(restaurantObte)
    }

    useEffect(() => {
         obtenerRestaurant()
    }, [])

    return (
    <div>
        <h1>{t('Discover your next favorite restaurant.')}</h1>
        <div className="container-cards">
            {restaurantes.map((restau, index) => (
                <div key={index}>
                        <article className="card">
                        <img
                         className="card__background"
                         src="https://i.imgur.com/QYWAcXk.jpeg"
                         alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                        />
                        <div className="card__content flow">
                        <div className="card__content--container flow">
                            <h2 className="card__title">{restau.nombre_restaurante}</h2>
                            <p className="card__description">
                             hotel hotel fffgfgfgfsdsd dvfssvf fddf
                            </p>
                        </div>
                         <button onClick={() => navigate("/lasbrisas")} className="card__button">Read more</button>
                        </div>
                        </article>
                    </div>
                ))}
           </div>
    </div>
    );
  };
  export default CardsRestaurantes;