import { useState, useEffect } from "react";
import canton2 from "../services/cantonFech";
import distritos2 from "../services/distritoFech";
import especiali from "../services/especialidadesGet";
import especialiGet from "../services/EspecialidaGet";

const UsedataRest = (canton) => {
    const [distritos, setDistritos] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [restaurantesEspecialidades, setRestaurantesEspecialidades] = useState([])
    
    useEffect(() => {
        const loadCantones = async () => {
            const CantonesData = await canton2();
            setCantones(CantonesData)
        };
        loadCantones();
    }, []);

    useEffect(() => {
        const loadDistritos = async () => {
            if (canton) {
                const distritosData = await distritos2(canton);
                setDistritos(distritosData);
            } else {
                setDistritos([]);
            }
        };
        loadDistritos();
    }, [canton]);

    useEffect(() => {
        const loadEspecialidades = async () => {
            const EspecilityData = await especiali();
            setEspecialidades(EspecilityData);
        };
        loadEspecialidades();
    }, []);


    useEffect(() => {
        const loadRestaurantesEspecialidades = async () => {
            const restaurantesData = await especialiGet(); 
            console.log('Restaurantes Especialidades cargados:', restaurantesData)
            setRestaurantesEspecialidades(restaurantesData);
        };
        loadRestaurantesEspecialidades();
    }, [])

    

    return { distritos, cantones, especialidades, restaurantesEspecialidades };
};

export default UsedataRest