import express, { Express } from 'express';

import updateRoutine from '../controllers/routinesController/updateRoutine'

const router = express.Router();

router.get('/', updateRoutine);
router.post('/', updateRoutine);

export default router;