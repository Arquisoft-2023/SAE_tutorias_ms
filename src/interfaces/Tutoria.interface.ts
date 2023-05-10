export enum tipo_estado{
    solicitada = "Solicitada",
    rechazada = "Rechazada",
    programada = "Programada",
    no_realizada = "No Realizada",
    realizada = "Realizada"
}

export enum tipo_lugar{
    virtual = "Virtual",
    presencial = "Presencial"
}

export interface tutoria{
    id_tutoria: string;
    fecha: Date;
    lugar: tipo_lugar;
    estado: tipo_estado;
    objetivo: string;
    acuerdo: string;
    observaciones_tutor: string;
    observaciones_estudiante: string;
}

export type tutoria_sin_id = Omit<tutoria, 'id_tutoria'>;
export type tutoria_reporte = Omit<tutoria, 'id_tutoria' | 'observaciones_estudiante' | 'observaciones_tutor'>;