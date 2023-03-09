import { Schema, model } from "mongoose";
import { acompanyamiento } from "../interfaces/acompanyamiento.interface";

const AcompanyamientoSchema = new Schema<acompanyamiento>(
    {
        _id_Acompanyamiento: Schema.Types.ObjectId,
        usuario_un_Estudiante: {
            type: String,
            minlength: [ 3, 'El usuario no puede ser vacio' ],
            maxlength: [ 20, 'El usuario no puede tener más de 20 caracteres' ],
            required: true, 
        },
        usuario_un_Tutor: {
            type: String,
            minlength: [ 3, 'El usuario no puede ser vacio' ],
            maxlength: [ 20, 'El usuario no puede tener más de 20 caracteres' ],
            required: true, 
        },
        es_Tutor: {
            type: String,
            enum: ["Actual", "Antiguo"],
            required: true, 
        },
        lista_Tutoria: {
            type: [{
                _id_Tutoria: Schema.Types.ObjectId,
                fecha: {
                    type: String,
                    length: [ 9, 'El usuario no puede ser vacio' ],
                    required: true, 
                },
                lugar: {
                    type: String,
                    enum: ["Virtual", "Presencial"],
                    required: true, 
                },
                estado: {
                    type: String,
                    enum: ["Solicitada", "Rechazada", "Programada", "Realizada"],
                    required: true, 
                },
                objetivo: {
                    maxlength: [ 50, 'El usuario no puede tener más de 20 caracteres' ],
                    type: String,
                },
                acuerdo: {
                    type: String,
                },
                observaciones_Docente: {
                    type: String,
                },
                observaciones_Estudiante: {
                    type: String,
                }
            }],
            required: true, 
        },
        lista_Observacion: {
            type: [{
                _id_Observacion: Schema.Types.ObjectId,
                fecha: {
                    type: String,
                    length: [ 9, 'El usuario no puede ser vacio' ],
                    required: true, 
                },
                descripcion: {
                    type: String,
                    required: true, 
                }
            }],
            required: true, 
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ItemModel = model('acompanyamiento', AcompanyamientoSchema);

export default ItemModel;