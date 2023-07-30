import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
import { print, OutputType } from '../helpers/print.js';
import Exception from '../errors/Exception.js';
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    print('Ket noi db thanh cong', OutputType.SUCCESS);
    return connection;
  } catch (error) {
    const { code } = error;
    if (error.code == 8000) {
      throw new Exception(Exception.WRONG_DB_ACCOUNT);
    } else if (code == 'ENOTFOUND') {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }
    throw new Exception(Exception.WRONG_MONGODB_CONNECT);
  }
}
export default connect;

// connect();
