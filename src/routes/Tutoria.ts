import { Router,Request, Response } from "express";
import { crear_tutoria, obtener_todo_tutoria, obtener_todo_reporte } from "../controllers/Tutoria";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.send({data: 'Tutoria'})
});

router.post('/crear', crear_tutoria);

router.get('/all', obtener_todo_tutoria);
router.get('/reporte', obtener_todo_reporte);


export { router };