import express, { Express } from 'express';

import {getAppliance, getApplianceOfUser, getApplianceTypes, insertAppliance, updateAppliance} from '../controllers/appliancesController';

const router = express.Router();

router.get('/getAppliance', getAppliance);
router.get('/getApplianceTypes', getApplianceTypes);
router.post('/insertAppliance', insertAppliance);
router.post('/updateAppliance', updateAppliance);
router.get('/getApplianceOfUser', getApplianceOfUser);



export default router;