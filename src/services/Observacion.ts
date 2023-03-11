import { acompanyamiento, acompanyamiento_observacion } from "../interfaces/Acompanyamiento.interface";
import acompanyamientoModel from "../models/Acompanyamiento";

const insertar_observacion = async (item: acompanyamiento_observacion) => {
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();

    if (id_estudiante.localeCompare(id_tutor) === 0) return { data: "Usuarios iguales" };
    if (id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return { data: "Valores vacios no validos" };

    const verificarItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_estudiante, usuario_un_tutor: id_tutor, es_tutor: "Actual" }, '_id_acompanyamiento');

    if (verificarItem === null) {
        return { data: "No es posible insertar la observacion"};
    }
    const responseInsert = await acompanyamientoModel.updateOne({_id_acompanyamiento: verificarItem._id_acompanyamiento}, {
        $push:{
            lista_observacion:
            {
                $each: item.lista_observacion
            }
        }
    });
    return responseInsert.acknowledged;
};

const obtener_observaciones = async () => {

    const responseItem = await acompanyamientoModel.find({}, {lista_tutoria: 0});
    return responseItem;
};

const obtener_observaciones_reportes = async () => {
    const item = await acompanyamientoModel.find({}, {createdAt: 0, updatedAt: 0}); 
    const obsv: acompanyamiento[] = item as acompanyamiento[];  
    const responseItem = (): acompanyamiento_observacion[] =>{
        return obsv.map(({usuario_un_estudiante, usuario_un_tutor, es_tutor, lista_observacion}) =>{
            return {

                usuario_un_estudiante,
                usuario_un_tutor,
                es_tutor,
                lista_observacion
            }

        })
    }
    return responseItem();
};



export { insertar_observacion, obtener_observaciones , obtener_observaciones_reportes};