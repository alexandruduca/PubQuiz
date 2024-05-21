import { NextFunction, Request, Response } from 'express';
import Team from '../models/teamModel';
import GameResult from '../models/gameResultModel';
import { ObjectId } from 'mongodb';
import { ResponseCodes } from '../types/constants';
import { GameResultType, Result } from '../types/gameResults';

export const getTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query;
  const response = {
    myTeam: null,
    teams: [],
  };
  response.teams = await Team.find({}).select('_id name');
  if (id) {
    const userId = new ObjectId(id as string);
    const team = await Team.findOne({ 'members._id': userId }).select('_id name leader');
    if (team) {
      response.myTeam = team;
      response.teams = response.teams.filter(
        ({ _id }) => !new ObjectId(_id).equals(new ObjectId(team._id))
      );
    }
  }
  res.status(200).send(response);
};

export const getTeamById = async (req: Request, res: Response, next: NextFunction) => {
  const { teamId } = req.params;
  const team = await Team.findOne({ _id: new ObjectId(teamId) });
  const modifiedTeam = { ...team.toObject() };
  modifiedTeam.statistics = {};
  const gameResults = await GameResult.find({}).select('results');

  const countPlaces = (place: number) => {
    let numberOfPlaces = 0;
    gameResults.forEach((gameResult: GameResultType) => {
      if (gameResult.results[place - 1].teamName === team.name) {
        numberOfPlaces++;
      }
    });
    return numberOfPlaces;
  };

  const averagePlace = () => {
    let totalPlace = 0;
    let totalGames = 0;
    gameResults.forEach((gameResult: GameResultType) => {
      gameResult.results.forEach((result, index) => {
        if (result.teamName === team.name) {
          totalGames++;
          totalPlace += index + 1;
        }
      });
    });
    if (totalGames === 0) {
      return 0;
    }
    const average = totalPlace / totalGames;
    return Number.isInteger(average) ? average : average.toFixed(2);
  };

  const connectionPerformance = () => {
    const teamPoints: Record<string, number> = {};
    let totalGames = 0;

    gameResults.forEach((gameResult: GameResultType) => {
      totalGames++;

      gameResult.results.forEach(({ teamName, points, joker }) => {
        let currentPoints = points[2];
        if (joker === 2) {
          currentPoints = currentPoints / 2;
        }
        if (teamName in teamPoints) {
          teamPoints[teamName] += currentPoints;
        } else {
          teamPoints[teamName] = currentPoints;
        }
      });
    });

    let bestTeam: { teamName: string; points: number } = { teamName: '', points: 0 };
    Object.entries(teamPoints).forEach(([teamName, points]) => {
      const averagePoints = points / totalGames;
      teamPoints[teamName] = averagePoints;
      if (averagePoints > bestTeam.points) {
        bestTeam = { teamName, points: averagePoints };
      }
    });

    return {
      teamName: bestTeam.teamName,
      points: Number.isInteger(bestTeam.points) ? bestTeam.points : bestTeam.points.toFixed(2),
    };
  };

  const jokerPerformance = () => {
    const teamPoints: Record<string, number> = {};
    let totalGames = 0;

    gameResults.forEach((gameResult: GameResultType) => {
      totalGames++;

      gameResult.results.forEach(({ teamName, points, joker }) => {
        if (teamName in teamPoints) {
          teamPoints[teamName] += points[joker];
        } else {
          teamPoints[teamName] = points[joker];
        }
      });
    });

    let bestTeam: { teamName: string; points: number } = { teamName: '', points: 0 };
    Object.entries(teamPoints).forEach(([teamName, points]) => {
      const averagePoints = points / totalGames;
      teamPoints[teamName] = averagePoints;
      if (averagePoints > bestTeam.points) {
        bestTeam = { teamName, points: averagePoints };
      }
    });

    return {
      teamName: bestTeam.teamName,
      points: Number.isInteger(bestTeam.points) ? bestTeam.points : bestTeam.points.toFixed(2),
    };
  };

  const topTeams = () => {
    const teamPlacement: Record<string, number> = {};
    let totalGames = 0;

    gameResults.forEach((gameResult: GameResultType) => {
      totalGames++;

      gameResult.results.forEach(({ teamName }, index) => {
        if (teamName in teamPlacement) {
          teamPlacement[teamName] += index;
        } else {
          teamPlacement[teamName] = index;
        }
      });
    });

    const teamPointsArray = Object.entries(teamPlacement).sort((a, b) => a[1] - b[1]);

    const topThreeTeams = teamPointsArray.slice(0, 3);

    return {
      firstTeamName: topThreeTeams[0][0],
      secondTeamName: topThreeTeams[1][0],
      thirdTeamName: topThreeTeams[2][0],
    };
  };

  modifiedTeam.statistics.firstPlace = countPlaces(1);
  modifiedTeam.statistics.secondPlace = countPlaces(2);
  modifiedTeam.statistics.thirdPlace = countPlaces(3);
  modifiedTeam.statistics.averagePlace = averagePlace();
  modifiedTeam.statistics.bestConnectionTeam = connectionPerformance();
  modifiedTeam.statistics.bestJokerTeam = jokerPerformance();
  modifiedTeam.statistics.leaderboard = topTeams();
  res.status(200).send(modifiedTeam);
};

export const postTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { id, username, name } = req.body;
  const existingTeam = await Team.findOne({ name });
  if (existingTeam) {
    return res.status(400).send(ResponseCodes.TEAM_ALREADY_EXISTS);
  }
  const leader = {
    _id: new ObjectId(id),
    username,
  };
  const newTeam = new Team({
    name,
    leader,
    members: [leader],
  });
  try {
    await newTeam.save();
    res.status(201).send(ResponseCodes.TEAM_CREATED_SUCCESSFULLY);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const joinTeamRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { teamId, id, username } = req.body;
  const team = await Team.findOne({ _id: new ObjectId(teamId) });
  const user = {
    _id: new ObjectId(id),
    username,
  };
  try {
    const index = team.joinRequests.findIndex(({ _id }: typeof user) => _id.equals(user._id));
    if (index === -1) {
      team.joinRequests.push(user);
      await team.save();
      res.status(200).send(ResponseCodes.JOIN_TEAM_REQUEST);
    } else {
      res.status(400).send(ResponseCodes.JOIN_REQUEST_ALREADY_SENT);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { teamId, id } = req.body;
  try {
    const team = await Team.findOneAndDelete({
      _id: new ObjectId(teamId),
      'leader._id': new ObjectId(id),
    });
    if (team) {
      res.status(202).send(ResponseCodes.TEAM_DELETED_SUCCESSFULLY);
    } else {
      res.status(400).send(ResponseCodes.TEAM_NOT_DELETED);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const leaveTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { teamId, id, username } = req.body;
  const user = {
    _id: new ObjectId(id),
    username,
  };
  try {
    const team = await Team.findOne({ _id: new ObjectId(teamId) });
    const index = team.members.findIndex(({ _id }: typeof user) => _id.equals(user._id));
    team.members.splice(index, 1);
    await team.save();
    res.status(202).send(ResponseCodes.TEAM_LEFT_SUCCESSFULLY);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const updateJoinRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { teamId } = req.params;
  const { id, username, isAccepted } = req.body;
  const user = {
    _id: new ObjectId(id),
    username,
  };
  try {
    const team = await Team.findOne({ _id: new ObjectId(teamId) });
    const index = team.joinRequests.findIndex(({ _id }: typeof user) => _id.equals(user._id));
    team.joinRequests.splice(index, 1);
    if (isAccepted) {
      team.members.push(user);
      await Team.updateMany(
        {
          _id: { $ne: new ObjectId(teamId) },
        },
        {
          $pull: { joinRequests: { _id: new ObjectId(id) } },
        }
      );
      await team.save();
      res.status(200).send(ResponseCodes.JOIN_REQUEST_ACCEPTED);
    } else {
      await team.save();
      res.status(400).send(ResponseCodes.JOIN_REQUEST_DECLINED);
    }
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const kickMember = async (req: Request, res: Response, next: NextFunction) => {
  const { teamId, id, username } = req.body;
  const user = {
    _id: new ObjectId(id),
    username,
  };
  try {
    const team = await Team.findOne({ _id: new ObjectId(teamId) });
    const index = team.members.findIndex(({ _id }: typeof user) => _id.equals(user._id));
    team.members.splice(index, 1);
    await team.save();
    res.status(200).send(ResponseCodes.KICK_MEMBER_SUCCESSFULLY);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

export const updateLeader = async (req: Request, res: Response, next: NextFunction) => {
  const { teamId } = req.params;
  const { id, username } = req.body;
  const newLeader = {
    _id: new ObjectId(id),
    username,
  };
  try {
    const team = await Team.findByIdAndUpdate(new ObjectId(teamId), { leader: newLeader });
    res.status(200).send(ResponseCodes.LEADER_UPDATED_SUCCESSFULLY);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
