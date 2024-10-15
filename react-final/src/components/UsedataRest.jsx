import { useState, useEffect } from "react";
import canton2 from "../services/cantonFech";
import distritos2 from "../services/distritoFech";
import especiali from "../services/especialidadesGet";
import userGET from "../services/getUser";

const UsedataRest = (canton) => {
    const [distritos, setDistritos] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    
    useEffect(() => {
        const loadCantones = async () => {
            const CantonesData = await canton2();
            setCantones(CantonesData);
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

    return { distritos, cantones, especialidades };
};

export default UsedataRest