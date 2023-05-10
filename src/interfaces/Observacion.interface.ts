export interface observacion{
    id_observacion: string;
    fecha: Date;
    descripcion: string;
}

export type observacion_sin_id = Omit<observacion, 'id_observacion'>;