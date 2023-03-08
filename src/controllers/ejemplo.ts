import { Request, Response } from 'express';
import { handleHttp } from "../utils/error.handle";
import { insertItem, getCar, getCarid } from '../services/ejemplo';

const getItem = async ({params}: Request, res: Response) => {
    try {
        const { idx } = params;
        const responseItem = await getCarid(idx);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const getItems = async (_req: Request, res: Response) => {
    try {
        const responseItem = await getCar();
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_ITEM');
    }
};

const postItem = async ({ body }: Request, res: Response) => {
    try {
        const responseItem = await insertItem(body);
        res.send(responseItem);
    } catch (e) {
        handleHttp(res, "ERROR_POST_ITEM",e);
    }
};

const updateItems = () => {

};

const deleteItems = () => {

};

export { getItem, getItems, postItem, updateItems , deleteItems};