import RestaGet from "../services/getRestaurant"
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import ModalUpdate from "./ModalUpdate";


const CardAdmi = () => {
    const [restaurantes, setRestaurantes] = useState([])
    const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const { t } = useTranslation();

    const obtenerRestaurant = async () => {
        const restaurantObte = await RestaGet()
        setRestaurantes(restaurantObte)
    }

    const ClickEdit = (restaurante) => {
      setRestauranteSeleccionado(restaurante)
      setMostrarModal(true)
    }

    const CerraModal = () => {
      setMostrarModal(false)
      setRestauranteSeleccionado(null)
    }

    const actualizarRestaurante = (restauranteActualizado) => {
      setRestaurantes((prevRestaurantes) =>
          prevRestaurantes.map((restau) =>
              restau.id === restauranteActualizado.id ? restauranteActualizado : restau
          )
      );
    };

    useEffect(() => {
      obtenerRestaurant()
    }, [])

  return (
    <div>
        <div>
          {restaurantes.map((restau, index) => (
            <li key={index}>
              <Card style={{ width: '14rem'}}>
              {/* <Card.Img variant="top" src= {produc.ImgUrl} /> */}
                <Card.Body>
                  <Card.Title>{restau.nombre_restaurante}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    <button onClick={() => ClickEdit(restau)}>{t('Edit')}</button>
                </Card.Body>
              </Card>
          </li>
          ))}
        </div>
        {restauranteSeleccionado && (
                <ModalUpdate
                show={mostrarModal}
                ModalCierre={CerraModal}
                restaurant={restauranteSeleccionado}
                actualizar={actualizarRestaurante}
            />
        )}
    </div>
  )
}

export default CardAdmi
