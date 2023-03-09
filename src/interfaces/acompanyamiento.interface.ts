import { observacion } from "./observacion.interface";
import { tutoria } from "./tutoria.interface";

export type tipo_Tutor = "Actual" | "Antiguo";

export interface acompanyamiento {
    _id_Acompanyamiento: string;
    usuario_un_Estudiante: string;
    usuario_un_Tutor: string;
    es_Tutor: tipo_Tutor;
    lista_Tutoria: tutoria[];
    lista_Observacion: observacion[];
}

export type acompanyamiento_tutoria = Omit<acompanyamiento, 'lista_Observacion'>;
export type acompanyamiento_observacion = Omit<acompanyamiento, 'lista_Tutoria'>;
