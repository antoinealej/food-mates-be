import express from 'express';
import create from './create';
import list from './list';

const router = express.Router();

router.use('/item', create);
router.use('/item', list);

export default router;