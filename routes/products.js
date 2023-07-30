import express from 'express';
const router = express.Router();
import { productController } from '../controllers/index.js';
import checkToken from '../authentication/auth.js';

//get products
router.get('/', productController.getAllProducts);
//get product by id
router.get('/:id', productController.getDetailProduct);

//add product
router.post('/', checkToken, productController.insertProduct);

router.post('/importProduct', productController.importProducts);

//put || patch product
router.patch('/', productController.updateProduct);
// res.send('PATCH(tạo mới nếu không tồn tại sản phẩm) PRODUCT');

router.delete('/:id', productController.removeProduct);

export default router;
