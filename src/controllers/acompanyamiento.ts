import { Request, Response } from 'express';
import { handleHttp } from "../utils/Error.handle";
import { insertar_estudiante, obtener_todo, obtener_tutor_s, obtener_lista_tutores, obtener_lista_estudiantes, actualizar_tutor_s} from '../services/Acompanyamiento';

const asignar_tutor = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertar_estudiante(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, "ERROR_POST_ITEM",e);
    }
};

const obtener_acompanyamiento = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_todo();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const obtener_tutor = async ({params}: Request, res: Response) => {
    try {
        const { id_un } = params;
        const responseItem = await obtener_tutor_s(id_un);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const obtener_tutores = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_lista_tutores();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const obtener_estudiantes = async ({params}: Request, res: Response) => {
    try {
        const { id_un } = params;
        const responseItem = await obtener_lista_estudiantes(id_un);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const actualizar_tutor = async ({body}: Request, res: Response) => {
    try {
        const responseItem = await actualizar_tutor_s(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_UPDATE_ITEM');
    }
};


export { asignar_tutor, obtener_acompanyamiento, obtener_tutor, obtener_tutores, obtener_estudiantes, actualizar_tutor};