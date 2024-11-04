import { useState } from "react";
import "../style/TabsHome.css";
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import CardsRestaurantes from "../components/CardRestaurantes"; // Asegúrate de que la ruta sea correcta

const TabsHome = () => {
  const [activeTab, setActiveTab] = useState("");
  const { t } = useTranslation();

  const handleTabChange = (tabId) => {
    if (activeTab === tabId) {
      setActiveTab(""); 
    } else {
      setActiveTab(tabId); 
    }
  };

  return (
    <article className="articlehome">
      <div className="grid__item--1of1 text-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          <h2 className="titulotabshome">{t("What's Your Favorite Food? Find the Perfect Restaurant:")}</h2>
          <div className="tabshome">
            {/* Pestaña 1 - Arroz */}
            <div className="tabhome arroz" onClick={() => handleTabChange("tab1")}>
              <div className="tab-circle">
                <img
                  src="https://i.pinimg.com/474x/02/32/ec/0232ec5cc5bc98a01ba40d568839446b.jpg"
                  alt="Plato de arroz"
                  className="tab-image"
                />
              </div>
              <label>Comida Tradicional</label>
            </div>

            {/* Pestaña 2 - Hamburguesa */}
            <div className="tabhome hamburguesa" onClick={() => handleTabChange("tab2")}>
              <div className="tab-circle">
                <img
                  src="https://i.pinimg.com/474x/55/e2/69/55e269a11e28460a7f0ca9d965ee4f99.jpg"
                  alt="Hamburguesa"
                  className="tab-image"
                />
              </div>
              <label>Comida Rápida</label>
            </div>

            {/* Pestaña 3 - Gourmet */}
            <div className="tabhome gourmet" onClick={() => handleTabChange("tab3")}>
              <div className="tab-circle">
                <img
                  src="https://i.pinimg.com/474x/75/26/4b/75264bc72d8c89518bafe23cc84a6ad4.jpg"
                  alt="Plato gourmet"
                  className="tab-image"
                />
              </div>
              <label>Gourmet</label>
            </div>

            {/* Pestaña 4 - Ensalada */}
            <div className="tabhome ensalada" onClick={() => handleTabChange("tab4")}>
              <div className="tab-circle">
                <img
                  src="https://i.pinimg.com/736x/3b/59/13/3b5913f9ebcf327ad37205c5314d3b8f.jpg"
                  alt="Ensalada"
                  className="tab-image"
                />
              </div>
              <label>Saludable</label>
            </div>

            {/* Pestaña 5 - Mariscos */}
            <div className="tabhome mariscos" onClick={() => handleTabChange("tab5")}>
              <div className="tab-circle">
                <img
                  src="https://i.pinimg.com/736x/2d/30/46/2d30462dacc0f3dd5b83c767f3eaa3de.jpg"
                  alt="Mariscos"
                  className="tab-image"
                />
              </div>
              <label>Mariscos</label>
            </div>
          </div>
        </motion.div>

        {/* Contenido de cada pestaña con las tarjetas de restaurantes */}
        {activeTab === "tab1" && (
          <div id="tab__content--1" className="tab__content active">
            <CardsRestaurantes tipo="tradicional" />
          </div>
        )}
        {activeTab === "tab2" && (
          <div id="tab__content--2" className="tab__content active">
            <CardsRestaurantes tipo="rapida" />
          </div>
        )}
        {activeTab === "tab3" && (
          <div id="tab__content--3" className="tab__content active">
            <CardsRestaurantes tipo="Gourmet" />
          </div>
        )}
        {activeTab === "tab4" && (
          <div id="tab__content--4" className="tab__content active">
            <CardsRestaurantes tipo="Saludable" />
          </div>
        )}
        {activeTab === "tab5" && (
          <div id="tab__content--5" className="tab__content active">
            <CardsRestaurantes tipo="Mariscos" />
          </div>
        )}
      </div>
    </article>
  );
};

export default TabsHome;


