export type tipo_estado = "Solicitada" | "Rechazada" | "Programada" | "No Realizada" | "Realizada";
export type type_lugar = "Virtual"| "Presencial";

export interface tutoria{
    _id_tutoria: string;
    fecha: string;
    lugar: type_lugar;
    estado: tipo_estado;
    objetivo: string;
    acuerdo: string;
    observaciones_tutor: string;
    observaciones_estudiante: string;
}
