import { observacion } from "./Observacion.interface";
import { tutoria } from "./Tutoria.interface";

export type tipo_Tutor = "Actual" | "Antiguo";

export interface acompanyamiento {
    _id_acompanyamiento: string;
    usuario_un_estudiante: string;
    usuario_un_tutor: string;
    es_tutor: tipo_Tutor;
    lista_tutoria: tutoria[];
    lista_observacion: observacion[];
}

export type acompanyamiento_tutoria = Omit<acompanyamiento, 'lista_Observacion'>;
export type acompanyamiento_observacion = Omit<acompanyamiento, 'lista_Tutoria'>;
