import { Schema, model } from "mongoose";
import { acompanyamiento } from "../interfaces/Acompanyamiento.interface";

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
            required: true, 
        },
        lista_observacion: {
            type: [{
                id_Observacion: Schema.Types.ObjectId,
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