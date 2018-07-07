import express from 'express';
import { categoryCollection } from '../../utils/mongo';

const router = express.Router();

router.get('/list', async (req, res, next) => {
  let categories;

  try {
    categories = await categoryCollection().find({}).toArray();
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.category.list.mongo.failed'
    });
  }

  return res.status(200).json(categories);
});

export default router;