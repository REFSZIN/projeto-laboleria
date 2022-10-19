import express from 'express';
import { postCake, postFlavour } from '../controllers/cakesControllers.js';
const router = express.Router();

router.post('/cakes', postCake);
router.post('/flavours', postFlavour);

export default router;