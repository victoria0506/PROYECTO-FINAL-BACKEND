import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "../style/Tabs.css";
import MenuRestaurantes from "./MenuRestaurantes";
import Map from "./Map";
import CalendarioUsuario from "./CalendarioUsuario";
import { useTranslation } from "react-i18next";
import { FaUtensils, FaClock, FaMoneyBillWave, FaMapMarkedAlt } from 'react-icons/fa';
const Tabs = ({ restauranteId }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const Token = "7059f86a1d940265ab5befed073aa4c03ecb0bd6";
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Llamada a la API para obtener la información del restaurante
    const fetchRestaurantInfo = async () => {
      try {
        if (!restauranteId) {
          console.error("El restauranteId no se ha proporcionado.");
          return;
        }

        const response = await fetch(`http://localhost:8000/api/admiRestaur/${restauranteId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${Token}` // Agrega el token aquí
          }
        });
        if (!response.ok) {
          throw new Error(`Error de red: ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos del restaurante:", data); // Verificar la estructura de los datos
        setRestaurantDetail(data);
      } catch (error) {
        console.error("Error al obtener la información del restaurante:", error);
      }
    };

    fetchRestaurantInfo();
  }, [restauranteId]);

  return (
    <article className="article">
      <div className="grid__item--1of1 text-center">
        <div className="tabs">
          <div className="tab" onClick={() => handleTabChange("tab1")}>
            <i className="icon email-cal"></i>
            <label htmlFor="text">{t('Information')}</label>
          </div>

          <div className="tab" onClick={() => handleTabChange("tab2")}>
            <i className="icon snapshot"></i>
            <label htmlFor="text">{t('Menu')}</label>
          </div>

          <div className="tab" onClick={() => handleTabChange("tab3")}>
            <i className="icon inbox-apps"></i>
            <label htmlFor="text">{t('Location')}</label>
          </div>

          <div className="tab" onClick={() => handleTabChange("tab4")}>
            <i className="icon events-icon"></i>
            <label htmlFor="text">{t('Calendar')}</label>
          </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} fullscreen={true}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>

          {activeTab === "tab1" && restaurantDetail && (
  <div id="tab__content--1" className="restaurant-card">
    <h1 className="restaurant-name">{restaurantDetail.nombre_restaurante}</h1>
    <p className="restaurant-description">{restaurantDetail.descripcion}</p>
    <div className="restaurant-info">
      <div className="info-row"><FaUtensils /> {t("Capacidad de personas")}: <strong>{restaurantDetail.capacidad}</strong> </div>
      <div className="info-row"><FaClock /> {t("Horario de apertura")}: <strong>{restaurantDetail.horario_apertura}</strong></div>
      <div className="info-row"><FaClock /> {t("Horario de cierre")}: <strong>{restaurantDetail.horario_cierre}</strong></div>
      <div className="info-row"><FaMoneyBillWave /> {t("Precio promedio")}: <strong>{restaurantDetail.precio_promedio}</strong></div>
    </div>
  </div>
)}




            {activeTab === "tab2" && (
              <div id="tab__content--2">
                <MenuRestaurantes restauranteId={restauranteId} />
              </div>
            )}

            {activeTab === "tab3" && (
              <div id="tab__content--3">
                <Map restauranteId={restauranteId} />
              </div>
            )}

            {activeTab === "tab4" && (
              <div id="tab__content--4">
                <CalendarioUsuario restauranteId={restauranteId} />
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </article>
  );
};

export default Tabs;





