import { Router } from 'express';
import { getHomepageOptions } from '../controllers/homepageController.js';

const router = Router();
router.get('/options', getHomepageOptions);

export default router;
