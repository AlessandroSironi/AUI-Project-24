import express, { Express } from 'express';

import { getUsername, getHomeAssistantKey, updateProfile } from '../controllers/userController';

const router = express.Router();

router.get('/getUsername', getUsername);
router.get('/getHomeAssistantKey', getHomeAssistantKey);
router.put('/updateUsername/:id', updateProfile);

export default router;