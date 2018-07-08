import express from 'express';
import details from './details';

const router = express.Router();

router.use('/', details);

export default router;