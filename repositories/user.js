import Exception from '../errors/Exception.js';
import { OutputType, print } from '../helpers/print.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!!isMatch) {
      //create JWT
      let token = jwt.sign({ data: existingUser }, process.env.JWT_SECRET, {
        // expiresIn: '60', //1 phut
        expiresIn: '30 days',
      });
      existingUser.token = token;
      await existingUser.save();

      return {
        ...existingUser.toObject(),
        password: 'Not Show',
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_USER_ACCOUNT);
    }
  } else {
    throw new Exception(Exception.WRONG_USER_ACCOUNT);
  }
};

const register = async ({
  email,
  password,
  birthday,
  name,
  phoneNumber,
  gender,
}) => {
  debugger;
  let existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    debugger;
    throw new Exception(Exception.USER_EXIST);
  }
  //encrypt password

  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await User.create({
    name,
    password: hashPassword,
    email,
    phoneNumber,
    birthday,
    gender,
  });
  return { ...newUser._doc, password: 'not Show' };
};

const logout = async (userId) => {
  const checkUser = User.findById(userId);
  debugger;
  try {
    if (!checkUser) {
      throw new Exception(Exception.USER_NOT_FOUND);
    } else {
      await User.findByIdAndUpdate(userId, { token: null });
    }
  } catch (exception) {
    throw new Exception(Exception.USER_NOT_FOUND);
  }
};

export default { login, register, logout };
