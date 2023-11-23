import express, { Express } from 'express';

import {retrieveChat} from '../controllers/chatController';

const router = express.Router();

router.get('/', retrieveChat);
router.post('/', retrieveChat);

export default router;