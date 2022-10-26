import express from 'express';
import { ordersMiddleware } from '../middlewares/ordersMiddleware.js';
import { postOrder,getOrders,getOrder,patchOrder } from "../controllers/ordersControllers.js"

const router = express.Router();

router.post('/order', ordersMiddleware, postOrder); //
router.get('/orders/', getOrders); //
router.get('/orders/:id', getOrder); //
router.patch('/order/:id',  patchOrder); //

export default router;  