import express, { Express } from 'express';

import testController from '../controllers/testController';

const router = express.Router();

router.get('/', testController);

export default router;
