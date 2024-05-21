import { Router } from 'express';
import {
  deleteTeam,
  getTeamById,
  getTeams,
  joinTeamRequest,
  kickMember,
  leaveTeam,
  postTeam,
  updateJoinRequest,
  updateLeader,
} from '../controllers/teamController';

const router = Router();

router.get('/', getTeams);

router.post('/', postTeam);

router.delete('/', deleteTeam);

router.get('/:teamId', getTeamById);

router.patch('/:teamId', updateJoinRequest);

router.patch('/:teamId/update-leader', updateLeader);

router.post('/join-requests', joinTeamRequest);

router.delete('/leave-team', leaveTeam);

router.delete('/kick', kickMember);

export default router;
