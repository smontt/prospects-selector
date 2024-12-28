import { Router } from 'express';
import { getProspects } from '../controllers/prospect.controller.js';

const router = Router();

router.get('/', getProspects);

export default router;
