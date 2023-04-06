import { acompanyamiento, acompanyamiento_observacion } from "../interfaces/Acompanyamiento.interface";
import acompanyamientoModel from "../models/Acompanyamiento";
import  {comprobacion_observaciones_sin_id} from "../utils/Utils.tutoria";
import { observacion_sin_id } from "../interfaces/Observacion.interface";

const insertar_observacion = async (item: acompanyamiento_observacion):Promise<any> => {
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();

    if (id_estudiante.localeCompare(id_tutor) === 0) return {es_error: "Yes", msg: "Valores iguales", status: 400};
    if (id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return {es_error: "Yes", msg: "Valores vacios no validos", status: 400};

    const verificarItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_estudiante, usuario_un_tutor: id_tutor, es_tutor: "Actual" }, '_id_acompanyamiento');

    if (verificarItem === null) {
        return {es_error: "Yes", msg: "No es posible insertar la observacion", status: 400};
    }

    let nueva_lista: observacion_sin_id[] = [];
    for(let doc of item.lista_observacion){
        nueva_lista.push(comprobacion_observaciones_sin_id(doc));
    }   

    const responseInsert = await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante, usuario_un_tutor: id_tutor, es_tutor: "Actual"}, {
        $push:{
            lista_observacion:
            {
                $each: nueva_lista
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

const obtener_obs_estudiante = async (id_estudiante: string) => {
    const item = await acompanyamientoModel.find({"usuario_un_estudiante": id_estudiante}, {createdAt: 0, updatedAt: 0, lista_tutoria : 0}); 
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

export { insertar_observacion, obtener_observaciones, obtener_obs_estudiante , obtener_observaciones_reportes};