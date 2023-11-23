import express, { Express } from 'express';

import {getAppliance, getApplianceTypes, insertAppliance, updateAppliance} from '../controllers/appliancesController';

const router = express.Router();

router.get('/getAppliance', getAppliance);
router.get('/getApplianceTypes', getApplianceTypes);
router.post('/insertAppliance', insertAppliance);
router.post('/updateAppliance', updateAppliance);


export default router;