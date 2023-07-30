import mongoose, { Schema } from 'mongoose';

const Cart = mongoose.model(
  'cart',
  new Schema({
    email_user: {
      type: String,
      required: true,
    },
    product_id: {
      type: Number,
      ref: 'products',
    },
    quantity: {
      type: Number,
      required: true,
    },
  })
);

export default Cart;
