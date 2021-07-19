enum CurrentViewEnum {
  DICE = 0,
  GAME_OVER = 2,
}

export interface Player {
  id: number;
  name: string;
  score: number;
  previousRoll: number;
  currentRoll: number;
  rollCount: number;
  skip: boolean;
  rank: number;
  prevRank: number;
}

export default {
  CurrentViewEnum,
};
