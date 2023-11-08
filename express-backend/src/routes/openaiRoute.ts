import express, { Express } from 'express';

import openaiController from '../controllers/openaiController';

const router = express.Router();

router.get('/', openaiController);

export default router;