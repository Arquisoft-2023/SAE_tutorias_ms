import { Router,Request, Response } from "express";
import { asignar_Tutor, obtener_Acompanyamiento, obtener_Tutor } from "../controllers/acompanyamiento";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.send({data: 'We are ready'})
});

router.post('/asignar', asignar_Tutor);

router.get('/all', obtener_Acompanyamiento);
router.get('/:id_un', obtener_Tutor);



//router.put('/:id', updateItems);

//router.delete('/:id', deleteItems);


export { router };