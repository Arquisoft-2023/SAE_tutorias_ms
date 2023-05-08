import { Request, Response } from 'express';
import { handleHttp } from "../utils/Error.handle";
import { insertar_estudiante, obtener_todo, obtener_todo_uno, obtener_todo_estudiante, obtener_todo_tutor, obtener_tutor_s, obtener_lista_tutores, obtener_lista_estudiantes, actualizar_tutor_s} from '../services/Acompanyamiento';

const asignar_tutor = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertar_estudiante(body);
        if(responseItem?.es_error === "Yes") handleHttp(res, responseItem);
        else res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error POST", status: 400},e);
    }
};

const obtener_acompanyamiento = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_todo();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const obtener_acompanyamiento_uno = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await obtener_todo_uno(body);
        if(responseItem?.es_error === "Yes") handleHttp(res, responseItem);
        else res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const obtener_acompanyamiento_tutor = async ({params}: Request, res: Response) => {
    try {
        const { id_un } = params;
        const responseItem = await obtener_todo_tutor(id_un);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};


const obtener_acompanyamiento_estudiante = async ({params}: Request, res: Response) => {
    try {
        const { id_un } = params;
        const responseItem = await obtener_todo_estudiante(id_un);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const obtener_tutor = async ({params}: Request, res: Response) => {
    try {
        const { id_un } = params;
        const responseItem = await obtener_tutor_s(id_un);
        if(responseItem?.es_error === "Yes") handleHttp(res, responseItem);
        else res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const obtener_tutores = async (_req: Request, res: Response) => {
    try {
        const responseItem = await obtener_lista_tutores();
        if(responseItem?.es_error === "Yes") handleHttp(res, responseItem);
        else res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const obtener_estudiantes = async ({params}: Request, res: Response) => {
    try {
        const { id_un } = params;
        const responseItem = await obtener_lista_estudiantes(id_un);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error GET", status: 400},e);
    }
};

const actualizar_tutor = async ({body}: Request, res: Response) => {
    try {
        const responseItem = await actualizar_tutor_s(body);
        if(responseItem?.es_error === "Yes") handleHttp(res, responseItem);
        else res.send(responseItem);
    } catch (e) {
        handleHttp(res, {msg: "Error UPDATE", status: 400},e);
    }
};


export { asignar_tutor, obtener_acompanyamiento, obtener_acompanyamiento_uno, obtener_acompanyamiento_estudiante, obtener_acompanyamiento_tutor, obtener_tutor, obtener_tutores, obtener_estudiantes, actualizar_tutor};