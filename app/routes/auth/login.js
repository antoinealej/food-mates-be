import express from 'express';
import { userCollection } from '../../utils/mongo';
import validateItem from '../../validator/user';
import { compare } from '../../utils/hash';
import { tokenConstruct } from '../../utils/token';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const user = {
    userName: req.body.userName,
    password: req.body.password
  };
  let mongoUser;
  let match;
  let token;

  try {
    await validateItem(user);
  } catch (e) {
    return res.status(422).json({
      message: e.message,
      code: 'food-mates.user.login.validation.failed'
    });
  }

  try {
    [mongoUser] = (await userCollection().find({ userName: user.userName }).toArray());
    if (!mongoUser) {
      return res.status(401).json({
        message: 'Wrong username / password combination',
        code: 'food-mates.user.login.find-user.failed'
      });
    }
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.user.login.mongo.find.failed'
    });
  }

  try {
    match = await compare(user.password, mongoUser.password);
    if (!match) {
      return res.status(401).json({
        message: 'Wrong username / password combination',
        code: 'food-mates.user.login.wrong-compare.failed'
      });
    }
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.user.login.compare.failed'
    });
  }

  try {
    token = await tokenConstruct({
      id: mongoUser._id // eslint-disable-line no-underscore-dangle
    });
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.user.login.token.failed'
    });
  }

  try {
    await userCollection().update({ userName: user.userName }, { $set: { token } });
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.user.login.mongo.update.failed'
    });
  }

  return res.status(200).json({ token });
});

export default router;