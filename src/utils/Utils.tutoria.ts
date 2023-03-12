import { tipo_estado, tipo_lugar, tutoria } from "../interfaces/Tutoria.interface";

const comprobar_string = (obj: any): string =>{
    if(!es_string(obj)){
        throw new Error('Tipo de dato incorrecto')
    }
    return obj;
}

const es_string = (obj: string): boolean => {
    return typeof obj === 'string';
}

const pasar_tipos_lugar = (obj: any): tipo_lugar => {
    if (!es_string(obj) || !es_tipo_lugar(obj)){
        throw new Error('Error tipo de lugar');
    }
    return obj;
}

const es_tipo_lugar = (obj: any): boolean => {
    return Object.values(tipo_lugar).includes(obj);
}

const pasar_tipo_estado = (obj: any): tipo_estado => {
    if (!es_string(obj) || !es_tipo_estado(obj)){
        throw new Error('Error tipo de estado');
    }
    return obj;
}

const es_tipo_estado = (obj: any): boolean => {
    return Object.values(tipo_estado).includes(obj);
}

const comprobacion_tutorias = (object: any): tutoria =>{
    const nuevo_item: tutoria = {
        _id_tutoria: object._id_tutoria || "",
        fecha: comprobar_string(object.fecha),
        lugar: pasar_tipos_lugar(object.lugar),
        estado: pasar_tipo_estado(object.estado),
        objetivo: comprobar_string(object.objetivo),
        acuerdo: comprobar_string(object.acuerdo),
        observaciones_tutor: comprobar_string(object.observaciones_tutor),
        observaciones_estudiante: comprobar_string(object.observaciones_estudiante)
    }
    return nuevo_item;
}

export default comprobacion_tutorias