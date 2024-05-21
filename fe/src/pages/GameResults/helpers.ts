import { GameInfoFields, GameInfoState } from '../../types/gameResults';

export const changeGameInfo = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  field: keyof typeof GameInfoFields,
  gameInfo: GameInfoState,
  setter: (field: keyof GameInfoState, value: string | string[]) => void,
  updateArray: (numberOfTeamsDelta: number) => void,
  roundIndex?: number
) => {
  if (field === GameInfoFields.rounds && roundIndex !== undefined) {
    const rounds = [...gameInfo.rounds];
    rounds[roundIndex] = e.target.value;
    setter(field, rounds);
  } else {
    setter(field, e.target.value);
    if (field === GameInfoFields.numberOfTeams) {
      const numberOfTeamsDelta = Number(e.target.value) - Number(gameInfo.numberOfTeams);
      updateArray(numberOfTeamsDelta);
    }
  }
};
