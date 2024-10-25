import { useState } from "react";
import { Modal } from "react-bootstrap";
import "../style/Tabs.css";
import MenuRestaurantes from "./MenuRestaurantes";
import Map from "./Map";
import Calendario from "./Calendario";
import CalendarioUsuario from "./CalendarioUsuario";

const Tabs = (restauranteId) => {
  console.log(restauranteId);
  
  const [activeTab, setActiveTab] = useState(""); // Estado inicial vacío
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  const handleTabChange = (tabId) => {
    // Actualizar el estado de la pestaña activa y mostrar el modal
    setActiveTab(tabId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Cerrar el modal
    setShowModal(false);
  };

  return (
    <article className="article">
      <div className="grid__item--1of1 text-center">
        <div className="tabs">
          {/* Pestaña 1 */}
          <div className="tab" onClick={() => handleTabChange("tab1")}>
            <i className="icon email-cal"></i>
            <label htmlFor="text">Información</label>
          </div>

          {/* Pestaña 2 */}
          <div className="tab" onClick={() => handleTabChange("tab2")}>
            <i className="icon snapshot"></i>
            <label htmlFor="text">Menú</label>
          </div>

          {/* Pestaña 3 */}
          <div className="tab" onClick={() => handleTabChange("tab3")}>
            <i className="icon inbox-apps"></i>
            <label htmlFor="text">Ubicación</label>
          </div>

          {/* Pestaña 4: Nueva pestaña de Eventos */}
          <div className="tab" onClick={() => handleTabChange("tab4")}>
            <i className="icon events-icon"></i>
            <label htmlFor="text">Calendario</label>
          </div>
        </div>

        {/* Modal que se muestra cuando se selecciona una pestaña */}
        <Modal show={showModal} onHide={handleCloseModal} fullscreen={true}>
          <Modal.Header closeButton>
            <Modal.Title>{/* Título dinámico según la pestaña */}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Mostrar contenido dinámico según la pestaña activa */}
            {activeTab === "tab1" && (
              <div id="tab__content--1">
                
              </div>
            )}
            {activeTab === "tab2" && (
              <div id="tab__content--2">
                <MenuRestaurantes />
              </div>
            )}
            {activeTab === "tab3" && (
              <div id="tab__content--3">
                <Map />
              </div>
            )}
            {activeTab === "tab4" && (
              <div id="tab__content--4">
              <CalendarioUsuario restauranteId={restauranteId}/>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </article>
  );
};

export default Tabs;



