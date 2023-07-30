import { body, validationResult } from 'express-validator';
import { userRepository, productRepository } from '../repositories/index.js';
import { EventEmitter } from 'node:events';
import HttpStatusCode from '../helpers/HttpStatusCode.js';
import Exception from '../errors/Exception.js';
const myEvent = new EventEmitter();
myEvent.on('event.register.user', (params) => {
  console.log(`????? : ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ error: errors.array() });
  }
  //email password
  const { email, password } = req.body;
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: 'Đăng nhập thành công',
      data: existingUser,
    });
  } catch (exception) {
    debugger;
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  const { email, password, birthday, name, phoneNumber, gender } = req.body;

  //Event Emitter
  myEvent.emit('event.register.user', { name: name, password: password });
  try {
    debugger;
    const user = await userRepository.register({
      email,
      password,
      birthday,
      name,
      phoneNumber,
      gender,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Đăng ký tài khoản thành công',
      data: user,
    });
  } catch (exception) {
    debugger;
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const logout = async (req, res) => {
  const userId = req?.params?.id;
  try {
    await userRepository.logout(userId);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Đăng xuất thành công',
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getDetailUser = (req, res) => {};

export default { login, register, getDetailUser, logout };
