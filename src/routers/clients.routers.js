import express from 'express';
import { clientsMiddleware } from '../middlewares/clientsMiddleware.js';
import { postClient,getClientList } from "../controllers/clientsControllers.js"

const router = express.Router();

router.post('/clients',clientsMiddleware, postClient); //
router.get('/clients/:id/orders', getClientList);

export default router;