import { Router } from 'express';
import {
  deleteGameResults,
  getGameResults,
  postGameResults,
  updateGameResults,
} from '../controllers/gameResultsController';

const protectedGameResultsRouter = Router();
protectedGameResultsRouter.post('/', postGameResults);
protectedGameResultsRouter.put('/', updateGameResults);
protectedGameResultsRouter.delete('/', deleteGameResults);

const unprotectedGameResultsRouter = Router();
unprotectedGameResultsRouter.get('/', getGameResults);

export { protectedGameResultsRouter, unprotectedGameResultsRouter };
