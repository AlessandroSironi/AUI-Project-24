import express, { Express } from 'express';

import insertAppliance from '../controllers/appliancesControllers/updateAppliance';

const router = express.Router();

router.get('/', insertAppliance);
router.post('/', insertAppliance);

export default router;