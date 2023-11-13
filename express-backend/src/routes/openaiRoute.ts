import express, { Express } from 'express';

import openaiController from '../controllers/openaiController';

const router = express.Router();

router.get('/', openaiController);
router.post('/', openaiController);

export default router;