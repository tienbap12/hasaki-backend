import Exception from '../errors/Exception.js';
import { productData } from '../fakeData/index.js';
import { Product } from '../models/index.js';

const getAllProducts = async ({ page, size, searchString }) => {
  //chuyển size và page sang dạng số
  page = parseInt(page);
  size = parseInt(size);

  //searchString? tồn tại trong các trường thông tin
  //aggregate data: Lọc dữ liệu
  let filteredProducts = await Product.aggregate([
    {
      // nếu k có điều kiện thì lấy hết
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: 'i' },
          },
        ],
      },
    },
    //lọc từ db để bỏ qua phần từ: vd page = 2 -1 * 40 => bỏ qua 40sp
    { $skip: (page - 1) * size },
    // giới hạn số phần tử trong 1 trang => size = 40
    { $limit: size },
  ]);
  return filteredProducts;
};

const getDetailProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Exception('Không tìm thấy sản phẩm với id ' + productId);
  }
  return product;
};

const insertProduct = async ({
  _id,
  name,
  category,
  brand,
  desc_vn,
  desc_eng,
  price,
  discount,
  old_price,
  image,
  rating,
  rates,
  products_sold,
}) => {
  try {
    debugger;
    const product = await Product.create({
      _id,
      name,
      category,
      brand,
      desc_vn,
      desc_eng,
      price,
      discount,
      old_price,
      image,
      rating,
      rates,
      products_sold,
    });
    return product;
    debugger;
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception('input error', exception.errors);
    }
    debugger;
  }
  debugger;
};

const importProducts = async () => {
  try {
    debugger;
    await Product.insertMany(productData);
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception('import error', exception.errors);
    }
  }
};

const updateProduct = async ({
  id,
  name,
  category,
  brand,
  desc_vn,
  desc_eng,
  price,
  discount,
  old_price,
  image,
  rating,
  rates,
  products_sold,
}) => {
  const product = await Product.findById(id);
  if (!product) {
    const newProduct = await Product.create({
      id,
      name,
      category,
      brand,
      desc_vn,
      desc_eng,
      price,
      discount,
      old_price,
      image,
      rating,
      rates,
      products_sold,
    });
    return {
      type: 'add',
      message: 'Đã thêm sản phẩm thành công',
      data: newProduct,
    };
  } else {
    product.name = name ?? product.name;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.desc_vn = desc_vn ?? product.desc_vn;
    product.desc_eng = desc_eng ?? product.desc_eng;
    product.price = price ?? product.price;
    product.discount = discount ?? product.discount;
    product.old_price = old_price ?? product.old_price;
    product.image = image ?? product.image;
    product.rating = rating ?? product.rating;
    product.rates = rates ?? product.rates;
    product.products_sold = products_sold ?? product.products_sold;
    //wait save to db continue return
    await product.save();
    return {
      type: 'add',
      message: 'Cập nhật sản phẩm thành công',
      data: product,
    };
  }
};

const removeProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    console.log(id);
    if (!product) {
      throw new Exception('Không tìm thấy sản phẩm ' + id);
    }
    return product;
  } catch (exception) {
    if (!!exception.errors) {
      throw new Exception('Xóa sản phẩm thất bại', exception.errors);
    }
  }
};

export default {
  getAllProducts,
  insertProduct,
  importProducts,
  removeProduct,
  getDetailProduct,
  updateProduct,
};
