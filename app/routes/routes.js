import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  let response;
  try {
    response = 'Hello World!';
  } catch (error) {
    return next({
      ...error,
      message: error.message,
      code: 'food-mates-be.main.failed'
    });
  }
  return res.status(200).json(response);
});

export default router;