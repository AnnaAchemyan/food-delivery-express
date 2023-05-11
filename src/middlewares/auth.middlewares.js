import jwt from 'jsonwebtoken';
import AppError from '../errors/error.handler.js';
import { messages, roles, statusCodes } from '../config/constants.js';

export const authenticatedUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new AppError(messages.unauthorized, statusCodes.unauthorized);
    }

    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    next();
  } catch (e) {
    res
      .status(e.httpStatus || statusCodes.unauthorized)
      .send({ message: messages.unauthorized });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== roles.admin) {
      throw new AppError(messages.notHavePermission, statusCodes.forbidden);
    }
    next();
  } catch (e) {
    res.status(e.httpStatus || statusCodes.forbidden).send({ message: e.message || '' });
  }
};
