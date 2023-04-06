import { observacion} from "./Observacion.interface";
import { tutoria } from "./Tutoria.interface";

export enum tipo_Tutor{
    Actual = "Actual",
    Antiguo = "Antiguo"
}

export interface acompanyamiento {
    _id_acompanyamiento: string;
    usuario_un_estudiante: string;
    usuario_un_tutor: string;
    es_tutor: tipo_Tutor;
    lista_tutoria: tutoria[];
    lista_observacion: observacion[];
}

export type acompanyamiento_sin_id = Omit<acompanyamiento, '_id_acompanyamiento'>;
export type acompanyamiento_tutoria = Omit<acompanyamiento, 'lista_observacion'>;
export type acompanyamiento_tutoria_sin_id = Omit<acompanyamiento, 'lista_observacion' | '_id_acompanyamiento'>;
export type acompanyamiento_observacion = Omit<acompanyamiento, 'lista_tutoria' | '_id_acompanyamiento'>;
