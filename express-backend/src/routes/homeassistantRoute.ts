import express, { Express } from 'express';

import { checkHomeAssistant, createAutomation } from '../controllers/homeassistantController';

const router = express.Router();

router.get('/checkHomeAssistant', checkHomeAssistant);
router.post('/createAutomation', createAutomation);


export default router;