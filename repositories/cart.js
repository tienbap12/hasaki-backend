import Exception from '../errors/Exception.js';
import { Cart } from '../models/index.js';

const addToCart = async (item) => {
  console.log(item.length);
  try {
    if (item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        let email_user = item[i].email_user;
        let product_id = item[i].product_id;
        const existingCartItem = await Cart.findOne({
          $and: [{ email_user }, { product_id }],
        });
        if (existingCartItem != null) {
          existingCartItem.quantity =
            existingCartItem.quantity + item[i].quantity ??
            existingCartItem.quantity;
          await existingCartItem.save();
        } else {
          await Cart.create(item[i]);
        }
      }
    } else {
      return { message: 'Thêm sản phẩm vào giỏ hàng thất bại' };
    }
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception('input error', exception.errors);
    }
  }
};

const getAllCartItems = async (email_user) => {
  try {
    const listCart = await Cart.aggregate([
      {
        $match: { email_user },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product_id',
          foreignField: '_id',
          as: 'data',
        },
      },
    ]);
    return listCart;
  } catch (exception) {
    throw new Exception('Lấy danh sách giỏ hàng thất bại');
  }
};

const updateCartItem = async ({ _id, quantity }) => {
  const cartItem = await Cart.findById(_id);
  if (!cartItem) {
    throw new Exception('Sản phẩm không tồn tại trong giỏ hàng');
  } else {
    cartItem.quantity = quantity ?? cartItem.quantity;
    await cartItem.save();
    return cartItem;
  }
};

const deleteCartItem = async (id) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(id);
    if (!cartItem) {
      throw new Exception('Không tồn tại sản phẩm trong giỏ hàng');
    } else {
      return cartItem;
    }
  } catch (exception) {
    throw new Exception('Xóa sản phẩm thất bại throw');
  }
};

export default { addToCart, getAllCartItems, deleteCartItem, updateCartItem };
