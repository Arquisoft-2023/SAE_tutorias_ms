import { tipo_estado, tipo_lugar, tutoria_sin_id, tutoria } from "../interfaces/Tutoria.interface";
import { observacion_sin_id } from "../interfaces/Observacion.interface";
import { acompanyamiento_sin_id, tipo_Tutor} from "../interfaces/Acompanyamiento.interface";

const comprobar_string = (obj: any): string =>{
    if(!es_string(obj)){
        console.log(obj);
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

const pasar_tipo_tutor = (obj: any): tipo_Tutor => {
    if (!es_string(obj) || !es_tipo_tutor(obj)){
        throw new Error('Error tipo estado de tutor');
    }
    return obj;
}

const es_tipo_tutor = (obj: any): boolean => {
    return Object.values(tipo_Tutor).includes(obj);
}

const es_fecha = (obj: any): boolean => {
    return obj instanceof Date;
}

const comprobar_fecha = (obj: any): Date =>{
    comprobar_string(obj);
    obj = new Date(obj);
    if(!es_fecha(obj)){
        throw new Error('Tipo de dato incorrecto')
    }
    return obj;
}

const comprobacion_tutorias_sin_id = (object: any): tutoria_sin_id =>{    
    const nuevo_item: tutoria_sin_id = {
        fecha: comprobar_fecha(object.fecha),
        lugar: pasar_tipos_lugar(object.lugar),
        estado: pasar_tipo_estado(object.estado),
        objetivo: comprobar_string(object.objetivo),
        acuerdo: comprobar_string(object.acuerdo),
        observaciones_tutor: comprobar_string(object.observaciones_tutor),
        observaciones_estudiante: comprobar_string(object.observaciones_estudiante)
    }
    return nuevo_item;
}

const comprobacion_tutorias = (object: any): tutoria =>{    
    const nuevo_item: tutoria = {
        id_tutoria: object.id_tutoria || object._id,
        fecha: comprobar_fecha(object.fecha),
        lugar: pasar_tipos_lugar(object.lugar),
        estado: pasar_tipo_estado(object.estado),
        objetivo: comprobar_string(object.objetivo),
        acuerdo: comprobar_string(object.acuerdo),
        observaciones_tutor: comprobar_string(object.observaciones_tutor),
        observaciones_estudiante: comprobar_string(object.observaciones_estudiante)
    }
    return nuevo_item;
}

const comprobacion_observaciones_sin_id = (object: any): observacion_sin_id =>{
    const nuevo_item: observacion_sin_id = {
        fecha: comprobar_fecha(object.fecha),
        descripcion: comprobar_string(object.descripcion)
    }
    return nuevo_item;
}

const comprobacion_acompanyamiento_sin_id = (object: any): acompanyamiento_sin_id =>{    
    const nuevo_item: acompanyamiento_sin_id = {
        usuario_un_estudiante: comprobar_string(object.usuario_un_estudiante),
        usuario_un_tutor: comprobar_string(object.usuario_un_tutor),
        es_tutor: pasar_tipo_tutor(object.es_tutor),
        lista_tutoria: [],
        lista_observacion: []
    }
    return nuevo_item;
}

export {comprobacion_tutorias_sin_id, comprobacion_observaciones_sin_id, comprobacion_acompanyamiento_sin_id, comprobacion_tutorias}