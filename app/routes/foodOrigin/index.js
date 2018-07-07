import express from 'express';
import create from './create';
import list from './list';

const router = express.Router();

router.use('/food-origin', create);
router.use('/food-origin', list);

export default router;