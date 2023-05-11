import express from 'express';
import authController from '../controllers/auth.controller.js';
import { resetPassValidation, userValidation, validate } from '../middlewares/validate.middleware.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.post(
  '/signup',
  upload.single('image'),
  userValidation(),
  validate,
  authController.signup,
);

router.get(
  '/activate',
  authController.activateAccount,
);

router.post(
  '/signin',
  authController.signin,
);

router.post(
  '/forgot-pass',
  authController.forgotPassword,
);

router.patch(
  '/reset-pass',
  resetPassValidation(),
  validate,
  authController.resetPassword,
);

export default router;
