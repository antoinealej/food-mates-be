import express from 'express';
import { ObjectId } from 'mongodb';
import { userCollection } from '../../utils/mongo';
import { tokenVerify } from '../../utils/token';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { id } = tokenVerify(req.headers.authorization);
  let mongoUser;

  try {
    [mongoUser] = (await userCollection().find({ _id: ObjectId(id) }).toArray());
  } catch (error) {
    return next({
      message: error.message,
      code: 'food-mates.user.details.mongo.failed'
    });
  }

  const user = {
    id: mongoUser._id,
    userName: mongoUser.userName,
    creationDate: mongoUser.creationDate
  }

  return res.status(200).json({ user });
});

export default router;