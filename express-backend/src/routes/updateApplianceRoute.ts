import express, { Express } from 'express';

import upsertAppliance from '../controllers/appliancesControllers/updateAppliance';

const router = express.Router();

router.get('/', upsertAppliance);
router.post('/', upsertAppliance);

export default router;