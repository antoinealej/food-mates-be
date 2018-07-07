import express from 'express';
import item from './item';
import category from './category';
import foodOrigin from './foodOrigin';
import auth from './auth';

const router = express.Router();

router.use('/', item);
router.use('/', category);
router.use('/', foodOrigin);
router.use('/', auth);

export default router;