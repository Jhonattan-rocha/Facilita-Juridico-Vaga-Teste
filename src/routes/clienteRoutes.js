import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';
import loginriquired from '../middlewares/loginriquired';

const router = new Router();

router.post('/cliente/', ClienteController.store);
router.get("/clientes/", loginriquired, ClienteController.index);
router.get("/cliente/:id", loginriquired, ClienteController.show);
router.put('/cliente/:id', loginriquired, ClienteController.update);
router.delete('/cliente/:id', loginriquired, ClienteController.delete);

export default router;
