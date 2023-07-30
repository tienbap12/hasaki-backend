import mongoose, { ObjectId, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
export const User = mongoose.model(
  'Users',
  new Schema(
    {
      id: { type: ObjectId },
      name: {
        type: String,
        required: true,
        validate: {
          validator: (value) => value.length > 3,
          message: 'Tên không được ít hơn 3 ký tự',
        },
      },
      email: {
        type: String,
        validate: {
          validator: (value) => isEmail(value),
          message: 'Không đúng định dạng email',
        },
      },
      password: {
        type: String,
        required: true,
        validate: {
          validator: (value) => value.length >= 6,
          message: 'Mật khẩu không được nhỏ hơn 6 ký tự',
        },
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        enum: {
          values: ['Nam', 'Nữ'],
          message: 'Vui lòng chọn đúng giới tính',
        },
        required: true,
      },
      birthday: {
        type: String,
        required: true,
      },
      token: {
        type: String,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )
);
export default User;
