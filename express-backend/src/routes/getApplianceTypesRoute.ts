import express, { Express } from 'express';

import getApplianceTypes from '../controllers/appliancesControllers/getApplianceTypes';

const router = express.Router();

router.get('/', getApplianceTypes);
router.post('/', getApplianceTypes);

export default router;