import express, { Express } from 'express';

import insertRoutine from '../controllers/routinesController/insertRoutine'

const router = express.Router();

router.get('/', insertRoutine);
router.post('/', insertRoutine);

export default router;