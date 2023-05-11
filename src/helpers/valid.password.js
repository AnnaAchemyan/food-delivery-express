import bcrypt from 'bcrypt';
import AppError from '../errors/error.handler.js';
import { messages, statusCodes } from '../config/constants.js';

const validatePassword = (payloadPass, userPass) => {
  const correctPassword = bcrypt.compareSync(payloadPass, userPass);
  if (!correctPassword) {
    throw new AppError(messages.incorrectEmailOrPass, statusCodes.badRequest);
  }
};
export default validatePassword;
