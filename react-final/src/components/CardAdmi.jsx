import RestaGet from "../services/getRestaurant"
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import ModalUpdate from "./ModalUpdate";
import { compartirContexto } from "../context/contextProvider"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DesactivarResta } from '../services/Desactivar';

const CardAdmi = () => {
  const [restaurantes, setRestaurantes] = useState([])
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const { t } = useTranslation();
  const {actualizador, setActu, apiData, setApiData} = compartirContexto()

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

  const Desactivar = async (restaurante) => {
    try {
      const idResta = restaurante.restaurante_id
      console.log("ID del restaurante a desactivar:", idResta);
      await DesactivarResta(idResta); 
      toast.success('Restaurante desactivado exitosamente');
      setRestaurantes((prevRestaurantes) => 
        prevRestaurantes.map((restau) =>
          restau.id === idResta ? { ...restau, activo: false } : restau
        )
      );
    } catch (error) {
      toast.error('Hubo un error al desactivar el restaurante. Por favor, inténtelo de nuevo.');
    }
  };

  useEffect(() => {
    obtenerRestaurant()
  }, [actualizador])

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
                <br /><br />
                <button onClick={() => Desactivar(restau)}>{t('Deactivate')}</button>
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
        <div>
            <ToastContainer />
        </div>
    </div>
  )
}

export default CardAdmi
