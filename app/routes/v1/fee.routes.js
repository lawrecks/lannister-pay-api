import { Router } from 'express';
import saveFeeSetup from '../../controllers/fee.controllers';
import destructureFeeBody from '../../middlewares/fee.middlewares';
import validateSaveSetup from '../../validators/fee.validators';

const router = Router();

router.post('/', validateSaveSetup, destructureFeeBody, saveFeeSetup);

export default router;
