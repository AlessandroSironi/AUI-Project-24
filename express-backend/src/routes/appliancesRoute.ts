import express, { Express } from 'express';

import {getAppliance, getApplianceOfUser, getApplianceTypes, insertAppliance, updateAppliance, deleteAppliance} from '../controllers/appliancesController';

const router = express.Router();

router.get('/getAppliance', getAppliance);
router.get('/getApplianceTypes', getApplianceTypes);
router.post('/insertAppliance', insertAppliance);
router.put('/updateAppliance/:id', updateAppliance);
router.get('/getApplianceOfUser', getApplianceOfUser);
router.delete('/deleteAppliance/:id', deleteAppliance);



export default router;