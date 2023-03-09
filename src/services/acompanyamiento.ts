import { acompanyamiento } from "../interfaces/acompanyamiento.interface";
import acompanyamientoModel from "../models/acompanyamiento";

const insertar_Estudiante = async (item: acompanyamiento) => {
    const responseInsert = await acompanyamientoModel.create(item);
    return responseInsert;
};

const obtener_Todo = async () => {
    const responseItem = await acompanyamientoModel.find({});
    return responseItem;
};

const obtener_Tutor_s = async (id_un: string) => {
    const responseItem = await acompanyamientoModel.findOne({ usuario_un_Estudiante: id_un , es_Tutor : "Actual"}, 'usuario_un_Tutor');
    return responseItem;
};


export { insertar_Estudiante , obtener_Todo, obtener_Tutor_s };