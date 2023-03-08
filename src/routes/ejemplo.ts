import { Router,Request, Response } from "express";
import { postItem, getItem, getItems , updateItems, deleteItems} from "../controllers/ejemplo";
import { logMiddleware } from "../middleware/log";

const router = Router();

/**
 * http://localhost:3002/items [GET]
 */
router.get('/', (_req: Request, res: Response) => {
    res.send({data: 'AQUI_VAN_LOS_MODELOS'})
});

router.get('/ping',(_req: Request, res: Response) => {
    console.log('someone pinged here!!')
    res.send('Hola mundo')
});

router.get('/get', getItems);

router.get('/:idx', logMiddleware, getItem);

router.post('/save', postItem);

router.put('/:id', updateItems);

router.delete('/:id', deleteItems);


export { router };