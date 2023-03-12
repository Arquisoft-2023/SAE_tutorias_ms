import { Request, Response } from 'express';
import { handleHttp } from "../utils/Error.handle";
import { insertar_tutoria , obtener_tutorias, obtener_tutoria_reporte, actualizar_tutoria} from '../services/Tutoria';

const crear_tutoria = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertar_tutoria(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, "ERROR_POST_ITEM",e);
    }
};

const obtener_todo_tutoria = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_tutorias();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const obtener_todo_reporte = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_tutoria_reporte();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};


const actualizar_tutoria_c = async ({body}: Request, res: Response) => {
    try {
        const responseItem = await actualizar_tutoria(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_UPDATE_ITEM');
    }
};




export { crear_tutoria, obtener_todo_tutoria, obtener_todo_reporte, actualizar_tutoria_c };