import { Router,Request, Response } from "express";
import { asignar_tutor, obtener_acompanyamiento, obtener_tutor, obtener_tutores, obtener_estudiantes, actualizar_tutor } from "../controllers/Acompanyamiento";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.send({data: 'We are ready'})
});

router.post('/asignar', asignar_tutor);

router.get('/all', obtener_acompanyamiento);
router.get('/tutores', obtener_tutores);
router.get('/estudiantes', obtener_estudiantes);
router.get('/:id_un', obtener_tutor);


router.put('/actualizar', actualizar_tutor);

//router.delete('/:id', deleteItems);


export { router };