import express from 'express';
import item from './item';
import category from './category';
import foodOrigin from './foodOrigin';

const router = express.Router();

router.use('/', item);
router.use('/', category);
router.use('/', foodOrigin);

export default router;