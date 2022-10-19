import express from 'express';
import { postOrder,getOrders,getOrder,patchOrder } from "../controllers/ordersControllers.js"

const router = express.Router();

router.post('/order', postOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.patch('/order/:id',  patchOrder);

export default router;