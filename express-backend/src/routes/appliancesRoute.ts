import express, { Express } from 'express';

import {getAppliance, getApplianceTypes, insertAppliance, updateAppliance} from '../controllers/appliancesController';

const router = express.Router();

router.get('/', getAppliance);
router.get('/', getApplianceTypes);
router.post('/', insertAppliance);
router.post('/', updateAppliance);


export default router;