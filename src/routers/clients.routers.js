import express from 'express';
import { clientsMiddleware } from '../middlewares/clientsMiddleware.js';
import { postClient,getClient } from "../controllers/clientsControllers.js"

const router = express.Router();

router.post('/clients',clientsMiddleware, postClient);
router.get('/clients/:id/orders', getClient);

export default router;