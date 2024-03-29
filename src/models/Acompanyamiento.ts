import { Schema, model } from "mongoose";
import { acompanyamiento } from "../interfaces/Acompanyamiento.interface";
// import dayjs from 'dayjs';

const AcompanyamientoSchema = new Schema<acompanyamiento>(
    {
        _id_acompanyamiento: Schema.Types.ObjectId,
        usuario_un_estudiante: {
            type: String,
            minlength: [ 3, 'El usuario no puede ser vacio' ],
            maxlength: [ 20, 'El usuario no puede tener más de 20 caracteres' ],
            required: true, 
        },
        usuario_un_tutor: {
            type: String,
            minlength: [ 3, 'El usuario no puede ser vacio' ],
            maxlength: [ 20, 'El usuario no puede tener más de 20 caracteres' ],
            required: true, 
        },
        es_tutor: {
            type: String,
            enum: ["Actual", "Antiguo"],
            required: true, 
        },
        lista_tutoria: {
            type: [{
                id_tutoria: Schema.Types.ObjectId,
                fecha: {
                    type: Date,
                    // length: [ 9, 'La fecha no es valida' ],
                    required: true, 
                },
                lugar: {
                    type: String,
                    enum: ["Virtual", "Presencial"],
                    required: true, 
                },
                estado: {
                    type: String,
                    enum: ["Solicitada", "Rechazada", "Programada", "No Realizada" ,"Realizada"],
                    required: true, 
                },
                objetivo: {
                    maxlength: [ 50, 'El usuario no puede tener más de 20 caracteres' ],
                    type: String,
                },
                acuerdo: {
                    type: String,
                },
                observaciones_tutor: {
                    type: String,
                },
                observaciones_estudiante: {
                    type: String,
                }
            }],
            strict: true,
            required: true, 
        },
        lista_observacion: {
            type: [{
                id_Observacion: Schema.Types.ObjectId,
                fecha: {
                    type: Date,
                    // length: [ 9, 'La fecha no es valida' ],
                    required: true, 
                },
                descripcion: {
                    type: String,
                    required: true, 
                }
            }],
            required: true,
            strict: true, 
        },
    },    
    {
        strict: true,
        timestamps: true,
        versionKey: false
    }
)

const ItemModel = model('acompanyamiento', AcompanyamientoSchema);

export default ItemModel;