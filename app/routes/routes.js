import express from 'express';
import item from './item';
import category from './category';
import foodOrigin from './foodOrigin';
import auth from './auth';
import { verifyUser } from '../middleware/auth';

const router = express.Router();

router.use('/', auth);
router.use('/', verifyUser, item);
router.use('/', verifyUser, category);
router.use('/', verifyUser, foodOrigin);

export default router;