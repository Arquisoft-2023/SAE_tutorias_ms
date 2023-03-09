import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { insertar_Estudiante, obtener_Todo, obtener_Tutor_s } from '../services/acompanyamiento';

const asignar_Tutor = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertar_Estudiante(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, "ERROR_POST_ITEM",e);
    }
};

const obtener_Acompanyamiento = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_Todo();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const obtener_Tutor = async ({params}: Request, res: Response) => {
    try {
        const { id_un } = params;
        const responseItem = await obtener_Tutor_s(id_un);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

export { asignar_Tutor, obtener_Acompanyamiento, obtener_Tutor};