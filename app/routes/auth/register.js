import express from 'express';
import { userCollection } from '../../utils/mongo';
import validateItem from '../../validator/user';
import { hash } from '../../utils/hash';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const user = {
    userName: req.body.userName,
    password: req.body.password,
    creationDate: new Date().toISOString()
  };
  let password;

  try {
    await validateItem(user);
  } catch (e) {
    return res.status(422).json({
      message: e.message,
      code: 'food-mates.user.register.validation.failed'
    });
  }

  try {
    password = await hash(user.password);
  } catch (e) {
    return res.status(422).json({
      message: e.message,
      code: 'food-mates.user.register.hash.failed'
    });
  }

  try {
    await userCollection().insert({ ...user, password, token: false });
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.user.register.mongo.failed'
    });
  }

  return res.status(200).json({ status: 'registered' });
});

export default router;