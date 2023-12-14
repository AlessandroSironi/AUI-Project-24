import express, { Express } from 'express';

import { deleteRoutine, insertRoutine, updateRoutine, getRoutine, getRoutines } from '../controllers/routineController';

const router = express.Router();

router.post('/insertRoutine', insertRoutine);
router.post('/updateRoutine', updateRoutine);
router.post('/deleteRoutine', deleteRoutine);
router.get('/getRoutine', getRoutine);
router.get('/getRoutines', getRoutines);

export default router;
