import authService from '../services/auth.service.js';
import { statusCodes } from '../config/constants.js';
import unlinkImage from '../helpers/unlink.image.js';

async function signup(req, res) {
  try {
    res.send(await authService.signup(req.body, req.file, req.fileExtError));
  } catch (e) {
    if (req.file) {
      await unlinkImage(req.body.email, req.file);
    }
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}

async function activateAccount(req, res) {
  try {
    res.send(await authService.activateAccount(req.query.hash));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}

async function signin(req, res) {
  try {
    res.send(await authService.signin(req.body));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}

async function forgotPassword(req, res) {
  try {
    res.send(await authService.forgotPassword(req.body));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}

async function resetPassword(req, res) {
  try {
    res.send(await authService.resetPassword(req.query.hash, req.body));
  } catch (e) {
    res.status(e.httpStatus || statusCodes.notFound).send({ message: e.message || '' });
  }
}

export default {
  signup,
  activateAccount,
  signin,
  forgotPassword,
  resetPassword,
};
