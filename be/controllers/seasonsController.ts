import { NextFunction, Request, Response } from 'express';
import GameResult from '../models/gameResultModel';
import { SeasonType } from '../types/gameResults';

export const getSeasons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const seasons: SeasonType[] = [];
    const gameResults = await GameResult.find({});
    gameResults.forEach(({ season, game }: { season: number; game: number }) => {
      const seasonIndex = seasons.findIndex((seasonInstance) => seasonInstance.season === season);
      if (seasonIndex === -1) {
        seasons.push({ season, games: [game] });
      } else {
        seasons[seasonIndex].games.push(game);
      }
    });
    seasons.sort((a, b) => b.season - a.season);
    seasons.forEach((season) => season.games.sort((a, b) => b - a));
    res.status(200).send(seasons);
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};
