import {
  body, param, query, validationResult,
} from 'express-validator';
import mongoose from 'mongoose';
import { messages, statusCodes } from '../config/constants.js';
import unlinkImage from '../helpers/unlink.image.js';

export const userValidation = () => [
  body('firstName').isLength({ min: 2, max: 20 }).withMessage(messages.firstnameContain),
  body('lastName').isLength({ min: 2, max: 20 }).withMessage(messages.lastnameContain),
  body('email').isEmail().withMessage(messages.invalidEmail),
  body('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).withMessage(messages.passwordContain),
  body('phone').isMobilePhone('am-AM').withMessage(messages.invalidPhone),
];

export const emailValidation = () => [
  body('email').isEmail().withMessage(messages.invalidEmail),
];

export const updateUserValidation = () => [
  body('firstName').optional().isLength({ min: 2, max: 20 }).withMessage(messages.firstnameContain),
  body('lastName').optional().isLength({ min: 2, max: 20 }).withMessage(messages.lastnameContain),
  body('phone').optional().isMobilePhone('am-AM').withMessage(messages.invalidPhone),
];

export const paramsIdValidation = () => [
  param(['id', 'userId']).optional().isMongoId().withMessage(messages.invalidId),
];

export const bodyIdValidation = () => [
  body('videoId').optional().isMongoId().withMessage(messages.invalidId),
];

export const resetPassValidation = () => [
  body('newPass').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).withMessage(messages.passwordContain),
];

export const videoFieldsValidation = () => [
  body('title').optional().isLength({ min: 1, max: 100 }).withMessage(messages.incorrectTitle),
  body('link').optional().isLength({ min: 1, max: 500 }).withMessage(messages.incorrectLink),
  body('topic').optional().isLength({ min: 1, max: 100 }).withMessage(messages.incorrectTopic),
  body('description').optional().isLength({ min: 1, max: 1000 }).withMessage(messages.incorrectDescription),
  body('top').optional().isBoolean().withMessage(messages.incorrectTopField),
  body('homepage').optional().isBoolean().withMessage(messages.incorrectHomepageField),
  body('tags').optional().isArray().withMessage(messages.incorrectTagsField),
  body('materials').optional().isArray().withMessage(messages.incorrectMaterialsField),
];

export const playlistFieldsValidation = () => [
  body('title').optional().isLength({ min: 1, max: 100 }).withMessage(messages.incorrectTitle),
  body('topic').optional().isLength({ min: 1, max: 100 }).withMessage(messages.incorrectTopic),
  body('description').optional().isLength({ min: 1, max: 1000 }).withMessage(messages.incorrectDescription),
  body('tags').optional().isArray().withMessage(messages.incorrectTagsField),
];

export const pathFieldsValidation = () => [
  body('title').optional().isLength({ min: 1, max: 100 }).withMessage(messages.incorrectTitle),
  body('description').optional().isLength({ min: 1, max: 1000 }).withMessage(messages.incorrectDescription),
];

export const isCorrectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  if (req.file) {
    await unlinkImage(req.body.email, req.file);
  }
  return res.status(statusCodes.unprocessableEntity).json({
    errors: extractedErrors,
  });
};
