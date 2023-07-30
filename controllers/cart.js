import HttpStatusCode from '../helpers/HttpStatusCode.js';
import { cartRepository } from '../repositories/index.js';

const addToCart = async (req, res) => {
  try {
    const item = req.body;
    await cartRepository.addToCart(item);
    // console.log(item.length);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'thêm sản phẩm thành công',
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Thêm sản phẩm vào giỏ hàng thất bại',
    });
  }
};

const getAllCartItems = async (req, res) => {
  const email_user = req?.params?.email_user;
  try {
    const listCart = await cartRepository.getAllCartItems(email_user);
    res.status(HttpStatusCode.OK).json({
      message: 'Lấy danh sách giỏ hàng thành công',
      data: listCart,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Error',
    });
  }
};

const removeCartItem = async (req, res) => {
  const cartItemId = req?.params?.id;
  try {
    const removeProduct = await cartRepository.deleteCart(cartItemId);
    res.status(HttpStatusCode.OK).json({
      message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
      data: removeProduct,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Xóa sản phẩm thất bại',
    });
  }
};

const updateCartItem = async (req, res) => {
  const { _id, quantity } = req.body;
  // console.log(req.body);
  try {
    const cartItem = await cartRepository.updateCartItem({ _id, quantity });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Cập nhật sản phẩm trong giỏ hàng thành công',
      data: cartItem,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Cập nhật số lượng giỏ hàng thất bại',
    });
  }
};

export default { addToCart, getAllCartItems, removeCartItem, updateCartItem };
