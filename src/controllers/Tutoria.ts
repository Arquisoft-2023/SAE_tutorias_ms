import { Request, Response } from 'express';
import { handleHttp } from "../utils/Error.handle";
import { insertar_tutoria , obtener_tutorias, obtener_tutoria_reporte, obtener_tutorias_estudiante, obtener_tutorias_uno ,actualizar_tutoria} from '../services/Tutoria';

const crear_tutoria = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertar_tutoria(body);
        if(responseItem?.es_error === "Yes") handleHttp(res, responseItem);
        else res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error POST", status: 400},e);
    }
};

const obtener_todo_tutoria = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_tutorias();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const obtener_todo_reporte = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_tutoria_reporte();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const obtener_todo_tutorias_estudiante = async ({params}: Request, res: Response) => {
    try {
        const { id_un } = params;
        const responseItem = await obtener_tutorias_estudiante(id_un);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const obtener_todo_tutorias_uno = async ({body}: Request, res: Response) => {
    try {
        const responseItem = await obtener_tutorias_uno(body);
        if(responseItem?.es_error === "Yes") handleHttp(res, responseItem);
        else res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const actualizar_tutoria_c = async ({body}: Request, res: Response) => {
    try {
        const responseItem = await actualizar_tutoria(body);
        if(responseItem?.es_error === "Yes") handleHttp(res, responseItem);
        else res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error UPDATE", status: 400},e);
    }
};




export { crear_tutoria, obtener_todo_tutoria, obtener_todo_reporte, obtener_todo_tutorias_estudiante , obtener_todo_tutorias_uno ,actualizar_tutoria_c };