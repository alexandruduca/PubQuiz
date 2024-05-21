import { RootState } from '../../store/types';
import { Landmark, LandmarkType } from '../../types/teamRegistration';

export const selectSelectedTable = (state: RootState) => state.teamRegistration.selectedTable;

export const selectLayout = (state: RootState) => state.teamRegistration.reservationLayout ?? {};

export const selectLoading = (state: RootState) => state.teamRegistration.loading;

export const selectAvailableTables = (state: RootState) =>
  state.teamRegistration.reservationLayout.landmarks.filter(
    (landmark: Landmark) => landmark.type === LandmarkType.table && !landmark.teamName
  );

export const selectReservedTeams = (state: RootState) =>
  state.teamRegistration.reservationLayout?.landmarks.filter(
    (landmark: Landmark) => landmark.type === LandmarkType.table && landmark.teamName
  );
