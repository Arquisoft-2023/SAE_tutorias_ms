import { Router,Request, Response } from "express";
import { crear_tutoria, obtener_todo_tutoria, obtener_todo_reporte, obtener_todo_tutorias_estudiante, obtener_todo_tutorias_uno ,actualizar_tutoria_c } from "../controllers/Tutoria";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.send({data: 'Tutoria'})
});

router.post('/crear', crear_tutoria);

router.get('/all', obtener_todo_tutoria);
router.get('/reporte', obtener_todo_reporte);
router.get('/lista', obtener_todo_tutorias_uno);
router.get('/listaEstudiante/:id_un', obtener_todo_tutorias_estudiante);

router.put('/actualizar', actualizar_tutoria_c);

export { router };