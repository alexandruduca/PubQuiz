export enum LandmarkType {
  table = 'table',
  entrance = 'entrance',
  presenter = 'presenter',
  tv = 'tv',
}

export type Landmark = {
  row: number;
  column: number;
  type: LandmarkType;
  tableName?: string;
  recurrentReservation?: boolean;
  teamName?: string;
};
