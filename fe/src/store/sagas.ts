import contactSaga from '../pages/Contact/contactSaga';
import newGameResultsSaga from '../pages/GameResults/NewGameResults/newGameResultsSaga';
import {
  deleteGameResultsSaga,
  gameResultsSaga,
  updateGameResultsSaga,
  getGameResultsFiltersSaga,
} from '../pages/GameResults/gameResultsSaga';
import loginSaga from '../pages/Login/loginSaga';
import registerSaga from '../pages/Register/registerSaga';
import {
  getReservationsSaga,
  reserveTableSaga,
  resetReservationsSaga,
  updateTableSaga,
} from '../pages/TeamRegistration/teamRegistrationSaga';
import {
  deleteTeamSaga,
  getTeamByIdSaga,
  getTeamsSaga,
  joinTeamRequestSaga,
  kickMemberSaga,
  leaveTeamSaga,
  postTeamSaga,
  updateJoinRequestSaga,
  updateLeaderSaga,
} from '../pages/Teams/teamsSaga';

export default [
  newGameResultsSaga,
  gameResultsSaga,
  updateGameResultsSaga,
  deleteGameResultsSaga,
  getGameResultsFiltersSaga,
  loginSaga,
  registerSaga,
  getTeamsSaga,
  getTeamByIdSaga,
  postTeamSaga,
  joinTeamRequestSaga,
  deleteTeamSaga,
  updateJoinRequestSaga,
  leaveTeamSaga,
  kickMemberSaga,
  updateLeaderSaga,
  contactSaga,
  getReservationsSaga,
  reserveTableSaga,
  updateTableSaga,
  resetReservationsSaga,
];
