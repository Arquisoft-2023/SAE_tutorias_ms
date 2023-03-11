import { Router,Request, Response } from "express";
import { crear_obs, obtener_todo_obs, obtener_todo_reporte } from "../controllers/Observacion";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.send({data: 'Observacion'})
});

router.post('/crear', crear_obs);

router.get('/all', obtener_todo_obs);
router.get('/reporte', obtener_todo_reporte);


export { router };