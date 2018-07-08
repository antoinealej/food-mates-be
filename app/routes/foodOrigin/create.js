import express from 'express';
import { foodOriginCollection } from '../../utils/mongo';
import validateItem from '../../validator/foodOrigin';

const router = express.Router();

router.post('/create', async (req, res, next) => {
  const category = {
    name: req.body.name,
    creationDate: new Date().toISOString()
  };
  let response;

  try {
    await validateItem(category);
  } catch (e) {
    return res.status(422).json({
      message: e.message,
      code: 'food-mates.foodOrigin.create.validation.failed'
    });
  }

  try {
    response = await foodOriginCollection().insert(category);
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.foodOrigin.create.mongo.failed'
    });
  }

  return res.status(200).json(response);
});

export default router;