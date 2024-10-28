import { useState, useEffect } from "react";
import PutRestaur from "../services/UpdateAdmi";
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import UsedataRest from "./UsedataRest";
import { useTranslation } from 'react-i18next';
import SweetAlert2 from 'react-sweetalert2';
import { compartirContexto } from "../context/contextProvider";

const ModalUpdate = ({ show, ModalCierre, restaurant, actualizar }) => {
    const [nomRestaur, setNomrestaur] = useState(restaurant?.nombre_restaurante || '');
    const [precioPro, setPrecioPro] = useState(restaurant?.precio_promedio || '');
    const [capacidad, setCapacidad] = useState(restaurant?.capacidad || '');
    const [califiPromedio, setCalifiPromedio] = useState(restaurant?.calificacion_promedio || '');
    const [ubicacion, setUbicacion] = useState({ canton: "", distrito: "" });
    const [especiSelect, setEspeciSelect] = useState(restaurant?.especialidades || []);
    const { t } = useTranslation();
    const [swalProps, setSwalProps] = useState({});
    const {distritos, cantones, especialidades} = UsedataRest(ubicacion.canton)
    const {actualizador, setActu, apiData, setApiData} = compartirContexto()

    const EnvioActu = async (e) => {
        e.preventDefault();

        if (nomRestaur.trim() === "" || precioPro.trim() === capacidad.trim() === "" || !ubicacion.canton || !ubicacion.distrito || !especialidades) {
            setSwalProps({ // SweetAlert
                show: true,
                title: 'Error',
                text: 'Ingrese sus datos de manera correcta',
            });
        }else{
            const especialidadesValues = especiSelect.map(especialidad => especialidad.value);
            const Actuali = await PutRestaur(restaurant.restaurante_id,nomRestaur, precioPro, capacidad, califiPromedio, ubicacion, especialidadesValues)
            setActu(prev => prev + 1)
            actualizar(Actuali)
            ModalCierre()
        }
    };

    const CambiosDistritos = (e) => {
        console.log("estan ocurriendo cambios");
        setUbicacion({ ...ubicacion, distrito: e.target.value })
      }
    
    const CambiosCantones = (e) => {
        console.log("estan ocurriendo cambios");
        setUbicacion({canton: e.target.value, distrito: "" })
    }
    
    const CambiosEspecialidades = (e) => {
        console.log("estan ocurriendo cambios");
        const valor = Array.from(e.target.selectedOptions, Option => Option.value)
        setEspeciSelect(valor) 
        console.log(valor);
    } 

    return (
        <div>
                    <Modal show={show} onHide={ModalCierre}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Restaurante</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={EnvioActu}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre Restaurante</Form.Label>
                        <Form.Control
                            type="text"
                            value={nomRestaur}
                            onChange={(e) => setNomrestaur(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrecio">
                        <Form.Label>Precio Promedio</Form.Label>
                        <Form.Control
                            type="text"
                            value={precioPro}
                            onChange={(e) => setPrecioPro(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCapacidad">
                        <Form.Label>Capacidad</Form.Label>
                        <Form.Control
                            type="text"
                            value={capacidad}
                            onChange={(e) => setCapacidad(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCalificacion">
                        <Form.Label>Calificación Promedio</Form.Label>
                        <Form.Control
                            type="text"
                            value={califiPromedio}
                            onChange={(e) => setCalifiPromedio(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formCantones">
                        <Form.Label>Cantones:</Form.Label>
                        <Form.Control as="select" onChange={CambiosCantones}>
                            <option value="">Seleccione un cantón</option>
                            {cantones.map(canton => (
                                <option key={canton.id_canton} value={canton.id_canton}>
                                    {canton.nombre_canton}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDistritos">
                        <Form.Label>Distrito:</Form.Label>
                        <Form.Control as="select" onChange={CambiosDistritos}>
                            <option value="">Seleccione un distrito</option>
                            {distritos.map(distrito => (
                                <option key={distrito.id_distrito} value={distrito.id_distrito}>
                                    {distrito.nombre_distrito}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formEspecialidad">
                        <Form.Label>{t('Specialty')}:</Form.Label>
                        <Select
                            onChange={setEspeciSelect}
                            isMulti
                            isSearchable
                            options={especialidades.map(especialidad => ({
                                label: especialidad.descripcion,
                                value: especialidad.id_especialidad
                            }))}
                            className="basic"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Guardar Cambios
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
            <div>
               <SweetAlert2 {...swalProps} />
            </div>
        </div>
    );
};

export default ModalUpdate;
