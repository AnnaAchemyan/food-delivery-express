import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  bcryptSalt, isActive, messages, statusCodes, tokenLife,
} from '../config/constants.js';

import AppError from '../errors/error.handler.js';
import User from '../models/User.js';
import validatePassword from '../helpers/valid.password.js';
import { generateAccessToken, generateHash } from '../helpers/generate.token.js';
import { sendEmailActivateAccount, sendEmailForgotPass } from '../helpers/email.js';

async function signup(payload, file, imgExtError) {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(messages.emailAlreadyUsed, statusCodes.conflict);
  }
  if (imgExtError) {
    throw new AppError(messages.wrongImage, statusCodes.forbidden);
  }
  const hashPassword = bcrypt.hashSync(payload.password, bcryptSalt);

  const generatedHash = generateHash(
    payload.email,
    process.env.ACTIVATE_PASS_KEY,
    tokenLife.activateEmail,
  );

  const newUser = new User({
    ...payload,
    password: hashPassword,
    isActive: generatedHash,
    image: file?.path,
  });

  await newUser.save();

  const url = `${process.env.FRONT_URL}/activate?hash=${generatedHash}`;

  await sendEmailActivateAccount(url, payload.email);
  return {
    message: messages.registerActivateEmail,
  };
}

async function activateAccount(hash) {
  const user = await User.findOne({ isActive: hash });
  if (!user) {
    throw new AppError(messages.incorrectHash, statusCodes.forbidden);
  }
  jwt.verify(hash, process.env.ACTIVATE_PASS_KEY);

  user.isActive = isActive;
  await user.save();
  return {
    message: messages.accountActivated,
  };
}

async function signin(payload) {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(messages.incorrectEmailOrPass, statusCodes.notFound);
  }
  if (user.isActive !== isActive) {
    throw new AppError(messages.notVerifiedAccount, statusCodes.notAllowed);
  }
  validatePassword(payload.password, user.password);
  const accessToken = generateAccessToken(
    user.id,
    user.email,
    user.role,
  );

  return {
    message: messages.userLoggedIn,
    accessToken,
  };
}

async function forgotPassword(payload) {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(messages.userNotFound, statusCodes.notFound);
  }

  const generatedHash = generateHash(
    payload.email,
    process.env.FORGOT_PASS_KEY,
    tokenLife.forgotPass,
  );

  const url = `${process.env.FRONT_URL}/reset-password?hash=${generatedHash}`;

  await sendEmailForgotPass(url, payload.email);

  user.resetHash = generatedHash;
  await user.save();

  return {
    message: messages.emailSentForResetPass,
  };
}

async function resetPassword(hash, payload) {
  const user = await User.findOne({ resetHash: hash });
  if (!user) {
    throw new AppError(messages.userNotFound, statusCodes.notFound);
  }
  jwt.verify(hash, process.env.FORGOT_PASS_KEY);

  if (payload.newPass !== payload.confirmPass) {
    throw new AppError(messages.newAndConfirmPassMatch, statusCodes.forbidden);
  }
  user.password = await bcrypt.hash(payload.newPass, bcryptSalt);
  user.resetHash = '';
  await user.save();

  return {
    message: messages.passwordChanged,
  };
}

export default {
  signup,
  activateAccount,
  signin,
  forgotPassword,
  resetPassword,
};
