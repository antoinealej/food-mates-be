import express from 'express';
import login from './login';
import register from './register';

const router = express.Router();

router.use('/auth', login);
router.use('/auth', register);

export default router;