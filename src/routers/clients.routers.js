import express from 'express';
import { postClient,getClient } from "../controllers/clientsControllers.js"

const router = express.Router();

router.post('/clients', postClient);
router.get('/clients/:id/orders', getClient);

export default router;