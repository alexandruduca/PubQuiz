import { ResponseCodes } from './../types/constants';
import { Request, Response, NextFunction } from 'express';
import GameResult from '../models/gameResultModel';
import { ObjectId } from 'mongodb';
import { GameResultType } from '../types/gameResults';

export const postGameResults = async (req: Request, res: Response, next: NextFunction) => {
  const { game, season, numberOfTeams, rounds, results } = req.body;
  try {
    const existingGameResult = await GameResult.findOne({
      season: req.body.season,
      game: req.body.game,
    });
    if (existingGameResult) {
      res.status(400).send(ResponseCodes.GAME_ALREADY_EXISTS);
    } else {
      const initialResults: GameResultType = {
        game,
        season,
        numberOfTeams,
        rounds,
        results,
      };
      sortGameResults(initialResults);
      const sortedGameResults = new GameResult(initialResults);
      await sortedGameResults.save();
      res.status(201).send(ResponseCodes.GAME_CREATED_SUCCESSFULLY);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const sortGameResults = (gameResult: GameResultType) => {
  gameResult.results.sort((a, b) => {
    const sumA = a.points.reduce((acc, curr) => acc + curr, 0);
    const sumB = b.points.reduce((acc, curr) => acc + curr, 0);
    if (sumA !== sumB) {
      return sumB - sumA;
    }
    let index = a.points.length;
    while (index !== 0) {
      const pointsA = a.joker === index ? a.points[index] / 2 : a.points[index];
      const pointsB = b.joker === index ? b.points[index] / 2 : b.points[index];
      if (pointsA !== pointsB) {
        return pointsB - pointsA;
      }
      index--;
    }
    return 0;
  });
  return gameResult;
};

export const getGameResults = async (req: Request, res: Response, next: NextFunction) => {
  const { season, game } = req.query;
  const gameResult = await GameResult.findOne({ season, game });
  if (gameResult) {
    res.status(200).send(sortGameResults(gameResult));
  } else {
    res.status(404).send(ResponseCodes.SEASON_OR_GAME_NOT_FOUND);
  }
};

export const updateGameResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentGame = await GameResult.findOne({ _id: new ObjectId(req.body._id) });
    const existingGameResult = await GameResult.findOne({
      season: req.body.season,
      game: req.body.game,
    });
    if (existingGameResult && !existingGameResult._id.equals(currentGame._id)) {
      res.status(400).send(ResponseCodes.GAME_ALREADY_EXISTS);
    } else {
      await GameResult.findOneAndUpdate({ _id: new ObjectId(req.body._id) }, req.body);
      res.status(201).send(ResponseCodes.GAME_UPDATED_SUCCESSFULLY);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const deleteGameResults = async (req: Request, res: Response, next: NextFunction) => {
  const { season, game } = req.body;
  const gameResult = await GameResult.findOneAndDelete({ season, game });
  if (gameResult) {
    res.status(202).send(ResponseCodes.GAME_DELETED_SUCCESFULLY);
  } else {
    res.status(404).send(ResponseCodes.SEASON_OR_GAME_NOT_FOUND);
  }
};
