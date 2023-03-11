import { Request, Response } from 'express';
import { handleHttp } from "../utils/Error.handle";
import { insertar_observacion, obtener_observaciones , obtener_observaciones_reportes} from '../services/Observacion';

const crear_obs = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertar_observacion(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, "ERROR_POST_ITEM",e);
    }
};

const obtener_todo_obs = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_observaciones();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const obtener_todo_reporte = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_observaciones_reportes();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

export { crear_obs, obtener_todo_obs, obtener_todo_reporte };