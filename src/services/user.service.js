import bcrypt from 'bcrypt';
import fs from 'fs';
import User from '../models/User.js';
import AppError from '../errors/error.handler.js';
import {
  bcryptSalt, messages, roles, statusCodes,
} from '../config/constants.js';

async function getUsers() {
  const users = await User.find().select('-password');
  return users.map((user) => {
    const imageName = user.image?.split('/')[2];
    return {
      ...user.toJSON(),
      image: user.image ? `${process.env.BACK_URL}/${imageName}` : '',
    };
  });
}

async function getUserById(userId, userData) {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError(messages.userNotFound, statusCodes.notFound);
  }
  if (userId !== userData.id && userData.role !== roles.admin) {
    throw new AppError(messages.somethingWrong, statusCodes.forbidden);
  }

  const imageName = user.image?.split('/')[2];
  user.image = user.image ? `${process.env.BACK_URL}/${imageName}` : '';
  return { user };
}

async function updateUserData(payload, userId, userData, file) {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError(messages.userNotFound, statusCodes.notFound);
  }
  if (userId !== userData.id) {
    throw new AppError(messages.somethingWrong, statusCodes.forbidden);
  }
  if (!file && Object.keys(payload).length === 0) {
    throw new AppError(messages.noDataToUpdate, statusCodes.badRequest);
  }
  if (file && user.image && fs.existsSync(user.image)) {
    fs.unlinkSync(user.image);
  }
  user.set({
    firstName: payload.firstName ? payload.firstName : user.firstName,
    lastName: payload.lastName ? payload.lastName : user.lastName,
    phone: payload.phone ? payload.phone : user.phone,
    image: file ? file.path : user.image,
  });
  await user.save();

  const imageName = user.image?.split('/')[2];
  user.image = user.image ? `${process.env.BACK_URL}/${imageName}` : '';
  return user;
}

async function changePassword(userId, userData, payload) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(messages.userNotFound, statusCodes.notFound);
  }
  if (userId !== userData.id) {
    throw new AppError(messages.somethingWrong, statusCodes.badRequest);
  }
  const correctOldPass = await bcrypt.compare(payload.oldPass, user.password);
  if (!correctOldPass) {
    throw new AppError(messages.oldPasswordIncorrect, statusCodes.forbidden);
  }
  const samePass = await bcrypt.compare(payload.newPass, user.password);
  if (samePass) {
    throw new AppError(messages.newPasswordNotBeOldPassword, statusCodes.forbidden);
  }

  if (payload.newPass !== payload.confirmPass) {
    throw new AppError(messages.newAndConfirmPassMatch, statusCodes.forbidden);
  }
  user.password = await bcrypt.hash(payload.newPass, bcryptSalt);
  await user.save();
  return {
    message: messages.passwordChanged,
  };
}

export default {
  getUsers,
  getUserById,
  updateUserData,
  changePassword,
};
