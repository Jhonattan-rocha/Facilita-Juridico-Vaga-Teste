import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';

const router = new Router();

router.post('/cliente/', ClienteController.store);
router.get("/clientes/", ClienteController.index);
router.get("/cliente/:id", ClienteController.show);
router.put('/cliente/:id', ClienteController.update);
router.delete('/cliente/:id', ClienteController.delete);

export default router;
