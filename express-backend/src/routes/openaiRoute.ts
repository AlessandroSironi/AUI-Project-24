import express, { Express } from 'express';

import openaiHandler from '../controllers/openaiController';

const router = express.Router();

router.get('/', openaiHandler);
router.post('/', openaiHandler);

export default router;