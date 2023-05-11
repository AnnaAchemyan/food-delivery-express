import userService from '../services/user.service.js';
import { statusCodes } from '../config/constants.js';

async function getUsers(req, res) {
  try {
    res.send(await userService.getUsers());
  } catch (e) {
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}

async function getUserById(req, res) {
  try {
    res.send(await userService.getUserById(req.params.userId, req.user));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}

async function updateUserData(req, res) {
  try {
    res.send(
      await userService.updateUserData(req.body, req.params.userId, req.user, req.file),
    );
  } catch (e) {
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}

async function changePassword(req, res) {
  try {
    res.send(await userService.changePassword(req.params.userId, req.user, req.body));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}
export default {
  getUsers,
  getUserById,
  updateUserData,
  changePassword,
};
