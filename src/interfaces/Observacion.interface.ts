export interface observacion{
    _id_observacion: string;
    fecha: string;
    descripcion: string;
}

export type observacion_sin_id = Omit<observacion, '_id_observacion'>;