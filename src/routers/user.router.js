import express from 'express';
import { authenticatedUser, isAdmin } from '../middlewares/auth.middlewares.js';
import userController from '../controllers/user.controller.js';
import upload from '../middlewares/upload.js';
import {
  paramsIdValidation,
  resetPassValidation,
  updateUserValidation,
  validate,
} from '../middlewares/validate.middleware.js';

const router = express.Router();

router.get(
  '/',
  authenticatedUser,
  isAdmin,
  userController.getUsers,
);

router.patch(
  '/change-pass/:userId',
  authenticatedUser,
  paramsIdValidation(),
  resetPassValidation(),
  validate,
  userController.changePassword,
);

router.get(
  '/:userId',
  authenticatedUser,
  paramsIdValidation(),
  validate,
  userController.getUserById,
);

router.patch(
  '/:userId',
  authenticatedUser,
  upload.single('image'),
  updateUserValidation(),
  paramsIdValidation(),
  validate,
  userController.updateUserData,
);

export default router;
