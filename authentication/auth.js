import HttpStatusCode from '../helpers/HttpStatusCode.js';
import jwt from 'jsonwebtoken';
export default function checkToken(req, res, next) {
  try {
    const token = req?.headers?.authorization.split(' ')[1];
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Token is expired',
      });
    }
    next();
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: 'Unauthorized',
    });
  }
}
