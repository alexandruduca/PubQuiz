export type GameResultType = {
  season: number;
  game: number;
  numberOfTeams: number;
  results: Result[];
  rounds: string[];
};

export type Result = {
  teamName: string;
  joker: number;
  points: number[];
};

export type SeasonType = {
  season: number;
  games: number[];
};
