import { Router } from 'express';
import { postContact } from '../controllers/contactController';

const router = Router();

router.post('/', postContact);

export default router;
