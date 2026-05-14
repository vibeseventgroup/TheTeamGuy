import { Router } from 'express';
import { sendDirectSms } from '../controllers/communicationsController.js';

const router = Router();
router.post('/sms', sendDirectSms);

export default router;
