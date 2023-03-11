import { acompanyamiento } from "../interfaces/Acompanyamiento.interface";
import acompanyamientoModel from "../models/Acompanyamiento";

const insertar_estudiante = async (item: acompanyamiento) => {
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();
    
    if(id_estudiante.localeCompare(id_tutor) === 0) return {data: "Usuarios iguales"};;
    if(id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return {data: "Valores vacios no validos"};
    
    const verificarItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_estudiante , es_tutor : "Actual"});

    if(verificarItem == null){
        item.usuario_un_estudiante = id_estudiante;
        item.usuario_un_tutor = id_tutor;
        const responseInsert = await acompanyamientoModel.create(item);
        return responseInsert;
    }
    return verificarItem;
};

const obtener_todo = async () => {
    const responseItem = await acompanyamientoModel.find({});
    return responseItem;
};

const obtener_tutor_s = async (id_un: string) => {
    const responseItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_un , es_tutor : "Actual"}, 'usuario_un_tutor');
    if(responseItem == null) return {data: "No tiene tutor asignado"};
    return responseItem;
};


const obtener_lista_tutores = async () => {
    const responseItem = obtener_todo();
    const tutores = new Set<string>();
    if(responseItem == null) return {data: "No existen datos"};
    for(const documento of await responseItem){
        tutores.add(documento.usuario_un_tutor);
    }
    return JSON.stringify(
        tutores,
        (_key, value) => (value instanceof Set ? [...value] : value)
      );
};

const obtener_lista_estudiantes = async (id_un: string) => { 
    const responseItem = await acompanyamientoModel.find({usuario_un_tutor: id_un.toLowerCase()}, 'usuario_un_estudiante');
    return responseItem;
};


const actualizar_tutor_s = async (item: acompanyamiento) => {
    const id_estudiante = item.usuario_un_estudiante.toLowerCase();
    const id_tutor = item.usuario_un_tutor.toLocaleLowerCase();
    
    if(id_estudiante.localeCompare(id_tutor) === 0) return {data: "Usuarios iguales"};;
    if(id_estudiante.localeCompare("") === 0 || id_tutor.localeCompare("") === 0) return {data: "Valores vacios no validos"};

    const responseItem = await acompanyamientoModel.findOne({ usuario_un_estudiante: id_estudiante , usuario_un_tutor : id_tutor}, 'es_tutor');
    if(responseItem?.es_tutor === "Antiguo"){
        const responseupdate = await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante, usuario_un_tutor : id_tutor}, {es_tutor: "Actual"});
        await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante , es_tutor : "Actual"}, {es_tutor: "Antiguo"});
        return responseupdate.acknowledged;
    }
    else if(responseItem === null){
        item.usuario_un_estudiante = id_estudiante;
        item.usuario_un_tutor = id_tutor;
        const responseupdate = await acompanyamientoModel.create(item);
        await acompanyamientoModel.updateOne({usuario_un_estudiante: id_estudiante , es_tutor : "Actual"}, {es_tutor: "Antiguo"});
        return responseupdate;
    }
    return {data: "Es el mismo tutor asignado"};
};

export { insertar_estudiante , obtener_todo, obtener_tutor_s, obtener_lista_tutores, obtener_lista_estudiantes, actualizar_tutor_s};