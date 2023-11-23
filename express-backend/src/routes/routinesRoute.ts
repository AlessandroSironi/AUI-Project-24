import express, { Express } from 'express';

import {insertRoutine, updateRoutine} from '../controllers/routineController'

const router = express.Router();

router.post('/', insertRoutine);
router.post('/', updateRoutine);

export default router;