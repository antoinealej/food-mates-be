import express from 'express';
import create from './create';
import list from './list';

const router = express.Router();

router.use('/category', create);
router.use('/category', list);

export default router;