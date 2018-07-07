import express from 'express';
import { itemCollection } from '../../utils/mongo';
import validateItem from '../../validator/item';

const router = express.Router();

router.post('/create', async (req, res, next) => {
  const item = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    foodOrigin: req.body.foodOrigin,
    expiryDate: req.body.expiryDate,
    location: req.body.location,
    coordinates: req.body.coordinates,
    usedCondition: req.body.usedCondition,
    postDate: new Date().toISOString()
  };

  try {
    await validateItem(item);
  } catch (e) {
    return res.status(422).json({
      message: e.message,
      code: 'food-mates.item.create.validation.failed'
    });
  }

  try {
    await itemCollection().insert(item);
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.item.create.mongo.failed'
    });
  }

  return res.status(200).json({ status: 'created' });
});

export default router;