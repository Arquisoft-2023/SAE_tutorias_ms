import { acompanyamiento, tipo_Tutor } from "../interfaces/Acompanyamiento.interface";
import acompanyamientoModel from "../models/Acompanyamiento";
import  {comprobacion_acompanyamiento_sin_id} from "../utils/Utils.tutoria";

const insertar_estudiante = async (item: acompanyamiento): Promise<any> =>{
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();
    
    if(id_estudiante.localeCompare(id_tutor) === 0) return {es_error: "Yes", msg: "Valores iguales", status: 400};
    if(id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return {es_error: "Yes", msg: "Valores vacios no validos", status: 400};
    
    const verificarItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_estudiante , es_tutor : "Actual"});

    if(verificarItem == null){
        item.usuario_un_estudiante = id_estudiante;
        item.usuario_un_tutor = id_tutor;
        item.es_tutor = tipo_Tutor.Actual;
        const newItem = comprobacion_acompanyamiento_sin_id(item);
        const responseInsert = await acompanyamientoModel.create(newItem);
        return responseInsert;
    }
    return verificarItem;
};

const obtener_todo = async () => {
    const responseItem = await acompanyamientoModel.find({});
    return responseItem;
};

const obtener_tutor_s = async (id_un: string):Promise<any> => {
    const responseItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_un , es_tutor : "Actual"}, 'usuario_un_tutor');
    if(responseItem == null) return {es_error: "Yes", msg: "No tiene tutor asignado", status: 400};
    return responseItem;
};


const obtener_lista_tutores = async ():Promise<any> => {
    const responseItem = obtener_todo();
    const tutores = new Set<string>();
    if(responseItem == null) return {es_error: "Yes", msg: "No existen datos", status: 404};
    for(const documento of await responseItem){
        tutores.add(documento.usuario_un_tutor);
    }
    return JSON.stringify(
        tutores,
        (_key, value) => (value instanceof Set ? [...value] : value)
      );
};

const obtener_lista_estudiantes = async (id_un: string) => { 
    const responseItem = await acompanyamientoModel.find({usuario_un_tutor: id_un.toLowerCase()}, {usuario_un_estudiante: 1,  es_tutor: 1});
    return responseItem;
};

const obtener_todo_uno = async (item: acompanyamiento):Promise<any> => {
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();

    if(id_estudiante.localeCompare(id_tutor) === 0) return {es_error: "Yes", msg: "Valores iguales", status: 400};
    if(id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return {es_error: "Yes", msg: "Valores vacios no validos", status: 400};

    const response = await acompanyamientoModel.find({"usuario_un_estudiante": id_estudiante, "usuario_un_tutor": id_tutor}, {createdAt: 0, updatedAt: 0}); 
    return response;
};

const obtener_todo_tutor = async (id_tutor: string) => {
    const item = await acompanyamientoModel.find({"usuario_un_tutor": id_tutor}, {createdAt: 0, updatedAt: 0}); 
    return item;
};


const actualizar_tutor_s = async (item: acompanyamiento):Promise<any> => {
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();
    
    if(id_estudiante.localeCompare(id_tutor) === 0) return {es_error: "Yes", msg: "Usuarios iguales", status: 400};
    if(id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return {es_error: "Yes", msg: "Valores vacios no validos", status: 400};

    const responseItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_estudiante , usuario_un_tutor : id_tutor}, 'es_tutor');
    if(responseItem?.es_tutor === "Antiguo"){
        await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante , es_tutor : "Actual"}, {es_tutor: "Antiguo"});
        const responseupdate = await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante, usuario_un_tutor : id_tutor}, {es_tutor: "Actual"});
        return responseupdate.acknowledged;
    }
    else if(responseItem === null){
        item.usuario_un_estudiante = id_estudiante;
        item.usuario_un_tutor = id_tutor;
        item.es_tutor = tipo_Tutor.Actual;
        const newItem = comprobacion_acompanyamiento_sin_id(item);
        await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante , es_tutor : "Actual"}, {es_tutor: "Antiguo"});
        const responseupdate = await acompanyamientoModel.create(newItem);
        return responseupdate;
    }
    return {es_error: "Yes", msg: "Es el mismo tutor asignado", status: 400};
};

export { insertar_estudiante , obtener_todo, obtener_todo_uno, obtener_todo_tutor , obtener_tutor_s, obtener_lista_tutores, obtener_lista_estudiantes, actualizar_tutor_s};