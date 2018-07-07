import { ObjectId } from 'mongodb';
import { tokenVerify } from '../utils/token';
import { userCollection } from '../utils/mongo';

export async function verifyUser(req, res, next) {
  let token = req.headers.authorization;
  let data;

  try {
    data = tokenVerify(token);
    if (!token) {
      return res.status(401).json({
        message: 'Provide a authorization token',
        code: 'food-mates.middleware.auth.tokenVerify.token.failed'
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      code: 'food-mates.middleware.auth.tokenVerify.failed'
    });
  }

  const user = await userCollection().find({ _id: ObjectId(data.id) }).toArray();

  if(!user.length) {
    return res.status(401).json({
      message: 'User does not exist',
      code: 'food-mates.middleware.auth.user.failed'
    });
  }

  return next();
}