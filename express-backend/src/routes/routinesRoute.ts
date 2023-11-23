import express, { Express } from 'express';

import {insertRoutine, updateRoutine} from '../controllers/routineController'

const router = express.Router();

router.post('/insertRoutine', insertRoutine);
router.post('/updateRoutine', updateRoutine);

export default router;