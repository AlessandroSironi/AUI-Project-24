import express, { Express } from 'express';

import getAppliance from '../controllers/appliancesControllers/getAppliance';

const router = express.Router();

router.get('/', getAppliance);
router.post('/', getAppliance);

export default router;