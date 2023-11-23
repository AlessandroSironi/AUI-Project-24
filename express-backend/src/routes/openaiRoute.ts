import express, { Express } from 'express';

import openaiHandler from '../controllers/openaiController';

const router = express.Router();

router.post('/openaiHandler', openaiHandler);

export default router;