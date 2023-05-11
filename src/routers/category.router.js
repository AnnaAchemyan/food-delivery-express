import express from 'express';
import { authenticatedUser, isAdmin } from "../middlewares/auth.middlewares.js";
import categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post('/', authenticatedUser, isAdmin, categoryController.createCategory);

export default router;