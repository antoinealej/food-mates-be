import express from 'express';
import fileUpload from 'express-fileupload';
import { itemCollection } from '../../utils/mongo';
import validateItem from '../../validator/item';
import { tokenVerify } from '../../utils/token';
import { uploadPhoto } from '../../utils/photo';

const router = express.Router();
router.use(fileUpload());

router.post('/create', async (req, res, next) => {
  const { id } = tokenVerify(req.headers.authorization);

  const item = {
    user: id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    foodOrigin: req.body.foodOrigin,
    expiryDate: req.body.expiryDate,
    location: req.body.location,
    coordinates: {
      long: req.body.long,
      lat: req.body.lat,
    },
    usedCondition: req.body.usedCondition,
    postDate: new Date().toISOString()
  };
  const photo = req.files && req.files.photo;
  let photoPath;

  try {
    await validateItem(item);
  } catch (e) {
    return res.status(422).json({
      message: e.message,
      code: 'food-mates.item.create.validation.failed'
    });
  }

  if (!photo) {
    return res.status(422).json({
      message: 'No photo uploaded',
      code: 'food-mates.item.create.photo.failed'
    });
  }

  try {
    photoPath = await uploadPhoto(photo, '5b4084dda316fe7542bba5aa');
  } catch (e) {
    return res.status(422).json({
      message: '',
      code: 'food-mates.item.create.photo.failed'
    });
  }

  item.photo = photoPath;

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