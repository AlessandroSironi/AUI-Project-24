import express, { Express } from 'express';

import {deleteRoutine, insertRoutine, updateRoutine} from '../controllers/routineController'

const router = express.Router();

router.post('/insertRoutine', insertRoutine);
router.post('/updateRoutine', updateRoutine);
router.post('/deleteRoutine', deleteRoutine);

export default router;