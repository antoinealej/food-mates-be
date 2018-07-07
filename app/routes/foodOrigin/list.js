import express from 'express';
import { foodOriginCollection } from '../../utils/mongo';

const router = express.Router();

router.get('/list', async (req, res, next) => {
  let categories;

  try {
    categories = await foodOriginCollection().find({}).toArray();
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.foodOrigin.list.mongo.failed'
    });
  }

  return res.status(200).json(categories);
});

export default router;