import { acompanyamiento, acompanyamiento_tutoria } from "../interfaces/Acompanyamiento.interface";
import acompanyamientoModel from "../models/Acompanyamiento";
import comprobacion_tutorias from "../utils/Utils.tutoria";

const insertar_tutoria = async (item: acompanyamiento_tutoria) => {
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();

    if (id_estudiante.localeCompare(id_tutor) === 0) return { data: "Usuarios iguales" };
    if (id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return { data: "Valores vacios no validos" };

    const verificarItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_estudiante, usuario_un_tutor: id_tutor, es_tutor: "Actual" });

    if (verificarItem === null) {
        return { data: "No es posible insertar la tutoria"};
    }

    // item
    for(let doc of item.lista_tutoria){
        doc = comprobacion_tutorias(doc);
    }
    //   
    const responseInsert = await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante, usuario_un_tutor: id_tutor, es_tutor: "Actual"}, {
        $push:{
            lista_tutoria:
            {
                $each: item.lista_tutoria
            }
        }
    });
    return responseInsert.acknowledged;
};

const obtener_tutorias = async () => {

    const responseItem = await acompanyamientoModel.find({}, {lista_observacion: 0});
    return responseItem;
};

const obtener_observaciones_tutoria = async () => {
    const item = await acompanyamientoModel.find({}, {createdAt: 0, updatedAt: 0}); 
    const obsv: acompanyamiento[] = item as acompanyamiento[];  
    const responseItem = (): acompanyamiento_tutoria[] =>{
        return obsv.map(({usuario_un_estudiante, usuario_un_tutor, es_tutor, lista_tutoria}) =>{
            return {

                usuario_un_estudiante,
                usuario_un_tutor,
                es_tutor,
                lista_tutoria
            }

        })
    }
    return responseItem();
};

export { insertar_tutoria , obtener_tutorias, obtener_observaciones_tutoria };