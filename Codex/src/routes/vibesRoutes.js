import { Router } from 'express';
import { recommendVibes, getVibeById, getVibeAddons } from '../controllers/vibesController.js';

const router = Router();
router.get('/recommend', recommendVibes);
router.get('/:id/addons', getVibeAddons);
router.get('/:id', getVibeById);

export default router;
