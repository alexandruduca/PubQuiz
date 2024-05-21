import { Router } from 'express';
import {
  getReservations,
  postReservations,
  reserveTable,
  resetReservations,
  updateLandmark,
} from '../controllers/teamRegistrationController';

const unprotectedTeamRegistrationRouter = Router();
unprotectedTeamRegistrationRouter.get('/', getReservations);
unprotectedTeamRegistrationRouter.post('/new-layout', postReservations);

const protectedTeamRegistrationRouter = Router();
protectedTeamRegistrationRouter.post('/', reserveTable);
protectedTeamRegistrationRouter.patch('/reset', resetReservations);
protectedTeamRegistrationRouter.put('/landmark', updateLandmark);

export { unprotectedTeamRegistrationRouter, protectedTeamRegistrationRouter };
