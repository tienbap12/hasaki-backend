import express from 'express';
import { cartController } from '../controllers/index.js';
import checkToken from '../authentication/auth.js';

const router = express.Router();

router.post('/', checkToken, cartController.addToCart);
router.get('/:email_user', checkToken, cartController.getAllCartItems);
router.delete('/:id', checkToken, cartController.removeCartItem);
router.patch('/', checkToken, cartController.updateCartItem);

export default router;
