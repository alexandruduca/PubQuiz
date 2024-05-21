import endpoints from '../../../common/endpoints';
import { postRequest } from '../../../http';
import { NewGameResultsPayload } from '../../../types/gameResults';

const postNewGameResults = (payload: NewGameResultsPayload) =>
  postRequest(endpoints.gameResults, payload);
export default postNewGameResults;
