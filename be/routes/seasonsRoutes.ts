import { Router } from 'express';
import { getSeasons } from '../controllers/seasonsController';

const router = Router();

router.get('/', getSeasons);

export default router;
