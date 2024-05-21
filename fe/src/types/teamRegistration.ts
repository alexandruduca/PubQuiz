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

type Layout = null | {
  numberOfRows: number;
  numberOfColumns: number;
  tables: Landmark[];
};

export type TeamRegistrationState = {
  reservationLayout: Layout;
  selectedTable: Landmark | null;
  loading: boolean;
};

export type UpdateTableAction = {
  landmark: Landmark | null;
};

export type LayoutIconProps = {
  type: LandmarkType;
};

export type GridProps = {
  numberOfRows: number;
  numberOfColumns: number;
};

export type ReserveTableParams = {
  tableId: string;
  teamName: string;
};
