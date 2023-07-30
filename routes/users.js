import express from 'express';
import { body, validationResult } from 'express-validator';
import { userController } from '../controllers/index.js';
import checkToken from '../authentication/auth.js';

const router = express.Router();
// router.get('/', (req, res) => {
//   res.send('Get USER');
// });
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/logout/:id', checkToken, userController.logout);

export default router;
