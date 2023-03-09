export type tipo_estado = "Solicitada" | "Rechazada" | "Programada" | "Realizada";
export type type_lugar = "Virtual"| "Presencial";

export interface tutoria{
    _id_Tutoria: string;
    fecha: string;
    lugar: type_lugar;
    estado: tipo_estado;
    objetivo: string;
    acuerdo: string;
    observaciones_Tutor: string;
    observaciones_Estudiante: string;
}
