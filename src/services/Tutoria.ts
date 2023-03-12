import { acompanyamiento, acompanyamiento_tutoria , acompanyamiento_tutoria_sin_id} from "../interfaces/Acompanyamiento.interface";
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

    for(let doc of item.lista_tutoria){
        doc = comprobacion_tutorias(doc);
    }
     
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

const actualizar_tutoria = async (item: acompanyamiento_tutoria) => {

    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();
    
    const id_tutoria = item.lista_tutoria[0].id_tutoria;  
    item.lista_tutoria[0] = comprobacion_tutorias(item.lista_tutoria[0]);

    if(id_estudiante.localeCompare(id_tutor) === 0) return {data: "Usuarios iguales"};;
    if(id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0 || id_tutoria.localeCompare("") == 0) return {data: "Valores vacios no validos"};
    
    const responseItemOld =  await acompanyamientoModel.findOne({"usuario_un_estudiante": id_estudiante, "usuario_un_tutor": id_tutor, "es_tutor": "Actual","lista_tutoria._id": id_tutoria}, {"lista_tutoria.$": true});

    if(responseItemOld === null) return {data: "No existe datos"};
    
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

    if(correcto != 1) return {data: "Cambio de estado no valido"};
    
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