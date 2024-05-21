import endpoints from '../../common/endpoints';
import { getRequest, patchRequest, postRequest, putRequest } from '../../http';
import { Landmark, ReserveTableParams } from '../../types/teamRegistration';

export const reserveTableApi = (params: ReserveTableParams) =>
  postRequest(endpoints.teamRegistration, params);

export const getReservationsApi = () => getRequest(endpoints.teamRegistration);

export const updateTableApi = (params: Landmark) => putRequest(endpoints.updateLandmark, params);

export const resetReservationsApi = () => patchRequest(endpoints.resetReservations);
