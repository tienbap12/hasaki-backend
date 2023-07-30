import { print, OutputType } from '../helpers/print.js';
export default class Exception extends Error {
  static WRONG_DB_ACCOUNT = 'Sai tai khoan hoac mat khau database';
  static WRONG_CONNECTION_STRING = 'Sai server name/connection string';
  static WRONG_MONGODB_CONNECT = 'khong the ket noi database';
  static USER_EXIST = 'tai khoan da ton tai';
  static CANNOT_REGISTER_USER = 'khong the dang ky tai khoan';
  static WRONG_USER_ACCOUNT = 'Sai tài khoản hoặc mật khẩu';
  static USER_NOT_FOUND = 'Không tìm thấy tài khoản';
  constructor(message, validationErrors = {}) {
    super(message); // call constructor of parent class (Error)
    print(message, OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}
