import express from 'express';
import { authenticatedUser } from '../middlewares/auth.middlewares.js';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', authenticatedUser, orderController.createOrder);

export default router;
