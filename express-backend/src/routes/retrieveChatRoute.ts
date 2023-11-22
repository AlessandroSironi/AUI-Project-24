import express, { Express } from 'express';

import retrieveChat from '../controllers/chatControllers/retrieveChatController';

const router = express.Router();

router.get('/', retrieveChat);
router.post('/', retrieveChat);

export default router;