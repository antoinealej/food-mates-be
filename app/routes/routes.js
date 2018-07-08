import express from 'express';
import { logger } from 'alcwa_base_server';
import cors from 'cors';
import item from './item';
import category from './category';
import foodOrigin from './foodOrigin';
import auth from './auth';
import user from './user';
import { verifyUser } from '../middleware/auth';

const router = express.Router();

router.use(cors());
router.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
router.use((req, res, next) => {
  logger.info({
    url: req.url
  });
  next();
})

router.use('/', auth);
router.use('/', verifyUser, item);
router.use('/', verifyUser, category);
router.use('/', verifyUser, foodOrigin);
router.use('/me', verifyUser, user);

export default router;