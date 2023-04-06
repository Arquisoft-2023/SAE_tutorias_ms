import { acompanyamiento, acompanyamiento_tutoria , acompanyamiento_tutoria_sin_id} from "../interfaces/Acompanyamiento.interface";
import { tutoria_sin_id } from "../interfaces/Tutoria.interface";
import acompanyamientoModel from "../models/Acompanyamiento";
import  {comprobacion_tutorias_sin_id, comprobacion_tutorias} from "../utils/Utils.tutoria";

const insertar_tutoria = async (item: acompanyamiento_tutoria):Promise<any> => {
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();

    if (id_estudiante.localeCompare(id_tutor) === 0) return {es_error: "Yes", msg: "Valores iguales", status: 400};
    if (id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return {es_error: "Yes", msg: "Valores vacios no validos", status: 400};

    const verificarItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_estudiante, usuario_un_tutor: id_tutor, es_tutor: "Actual" });

    if (verificarItem === null) {
        return {es_error: "Yes", msg: "No es posible insertar la tutoria", status: 400};
    }

    let nuevalista: tutoria_sin_id[] = [];
    for(let doc of item.lista_tutoria){
        nuevalista.push(comprobacion_tutorias_sin_id(doc));
    }   
    
    const responseInsert = await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante, usuario_un_tutor: id_tutor, es_tutor: "Actual"}, {
        $push:{
            lista_tutoria:
            {
                $each: nuevalista
            }
        }
    });
    return responseInsert.acknowledged;
};

const obtener_tutorias = async () => {

    const responseItem = await acompanyamientoModel.find({}, {lista_observacion: 0});
    return responseItem;
};

const obtener_tutoria_reporte = async () => {
    const item = await acompanyamientoModel.find({}, {_id: 0, createdAt: 0, updatedAt: 0, lista_tutoria : {observaciones_tutor: 0, observaciones_estudiante: 0}}); 
    const obsv: acompanyamiento[] = item as acompanyamiento[];  
    const responseItem = (): acompanyamiento_tutoria_sin_id[] =>{
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

const actualizar_tutoria = async (item: acompanyamiento_tutoria):Promise<any> => {

    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();
    
    item.lista_tutoria[0] = comprobacion_tutorias(item.lista_tutoria[0])

    const id_tutoria = item.lista_tutoria[0].id_tutoria  
    item.lista_tutoria[0] = comprobacion_tutorias(item.lista_tutoria[0]);

    if(id_estudiante.localeCompare(id_tutor) === 0) return {es_error: "Yes", msg: "Valores iguales", status: 400};
    if(id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0 || id_tutoria.localeCompare("") == 0) return {es_error: "Yes", msg: "Valores vacios no validos", status: 400};
    
    const responseItemOld =  await acompanyamientoModel.findOne({"usuario_un_estudiante": id_estudiante, "usuario_un_tutor": id_tutor, "es_tutor": "Actual","lista_tutoria._id": id_tutoria}, {"lista_tutoria.$": true});

    if(responseItemOld === null) return {es_error: "Yes", msg: "No existe datos", status: 404};
    
    let correcto = 1;
    switch(responseItemOld.lista_tutoria[0].estado){
        case "Solicitada": 
            if(item.lista_tutoria[0].estado.localeCompare("Rechazada") === 0){
                item.lista_tutoria[0].acuerdo = "";
                item.lista_tutoria[0].lugar = responseItemOld.lista_tutoria[0].lugar;
            }
            else if(item.lista_tutoria[0].estado.localeCompare("Programada") === 0) item.lista_tutoria[0].acuerdo = "";
            else if (item.lista_tutoria[0].estado.localeCompare("No Realizada") === 0){
                item.lista_tutoria[0].acuerdo = "";
                item.lista_tutoria[0].lugar = responseItemOld.lista_tutoria[0].lugar;
            }
            else correcto = 0;
            break;
        case "Programada": 
            if(item.lista_tutoria[0].estado.localeCompare("No Realizada") === 0){
                item.lista_tutoria[0].acuerdo = "";
                item.lista_tutoria[0].lugar = responseItemOld.lista_tutoria[0].lugar;
            }
            else if(item.lista_tutoria[0].estado.localeCompare("Realizada") !== 0) correcto = 0;
            break;
        default:
            correcto = 0;
            break;
    }

    if(correcto != 1) return {es_error: "Yes", msg: "Cambio de estado no valido", status: 400};
    
    const responseItem = await acompanyamientoModel.updateOne({"usuario_un_estudiante": id_estudiante, "usuario_un_tutor": id_tutor, "es_tutor": "Actual","lista_tutoria._id": id_tutoria},
    { $set: 
        {
            "lista_tutoria.$.fecha": item.lista_tutoria[0].fecha,
            "lista_tutoria.$.lugar": item.lista_tutoria[0].lugar,
            "lista_tutoria.$.estado": item.lista_tutoria[0].estado,
            //"lista_tutoria.$.objetivo": item.lista_tutoria[0].objetivo,
            "lista_tutoria.$.acuerdo": item.lista_tutoria[0].acuerdo,
            "lista_tutoria.$.observaciones_tutor": item.lista_tutoria[0].observaciones_tutor,
            "lista_tutoria.$.observaciones_estudiante": item.lista_tutoria[0].observaciones_estudiante,
            // "lista_tutoria.$": 
            // {
            //     fecha: item.lista_tutoria[0].fecha,
            //     lugar: item.lista_tutoria[0].lugar,
            //     estado: item.lista_tutoria[0].estado,
            //     objetivo: item.lista_tutoria[0].objetivo,
            //     acuerdo: item.lista_tutoria[0].acuerdo,
            //     observaciones_tutor: item.lista_tutoria[0].observaciones_tutor,
            //     observaciones_estudiante: item.lista_tutoria[0].observaciones_estudiante
            // }
            
        }
    }, 
    );

    return responseItem.acknowledged;
};

export { insertar_tutoria , obtener_tutorias, obtener_tutoria_reporte, actualizar_tutoria };