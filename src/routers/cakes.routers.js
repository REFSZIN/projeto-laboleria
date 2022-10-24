import express from 'express';
import { cakesMiddleware } from '../middlewares/cakesMiddleware.js';
import { flavoursMiddleware } from '../middlewares/flavoursMiddleware.js';
import { postCake, postFlavour } from '../controllers/cakesControllers.js';
const router = express.Router();

router.post('/cakes',cakesMiddleware, postCake); //
router.post('/flavours',flavoursMiddleware, postFlavour); //

export default router;