import mongoose, { Schema } from 'mongoose';

const Product = mongoose.model(
  'Products',
  new Schema(
    {
      _id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
      },
      category: {
        type: String,
      },
      brand: {
        type: String,
      },
      desc_vn: {
        type: String,
      },
      desc_eng: {
        type: String,
      },
      price: {
        type: Number,
      },
      discount: {
        type: String,
      },
      old_price: {
        type: Number,
      },
      image: {
        type: String,
      },
      rating: {
        type: Number,
      },
      rates: {
        type: Number,
      },
      products_sold: {
        type: String,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  )
);
export default Product;
