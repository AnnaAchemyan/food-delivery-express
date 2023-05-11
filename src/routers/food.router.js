import express from 'express';
import { authenticatedUser, isAdmin } from '../middlewares/auth.middlewares.js';
import foodController from '../controllers/food.controller.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post(
  '/',
  authenticatedUser,
  isAdmin,
  upload.single('image'),
  foodController.createFood,
);

router.get(
  '/:foodId',
  authenticatedUser,
  foodController.getFoodById,
);

export default router;
