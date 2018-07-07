import express from 'express';
import create from './create';
import list from './list';
import photo from './photo';

const router = express.Router();

router.use('/item', create);
router.use('/item', list);
router.use('/item', photo);

export default router;