import { Action } from "./main";

type PlayerStats = {
  wpm: number;
  progress: number;
  isConnected: boolean;
  username: string;
};
type PlayerData = {
  username: string;
  userKey: number;
  roomKey: string;
};

export type MultiState = {
  playerStats: PlayerStats[];
  playerData: PlayerData | null;
};

export const SET_PLAYER_STATS = Symbol(),
  SET_PLAYER_DATA = Symbol();

const initState: MultiState = {
  playerStats: [],
  playerData: null,
};
function MultiReducer(
  state: MultiState = initState,
  { payload, type }: Action,
) {
  switch (type) {
    case SET_PLAYER_STATS:
      return { ...state, playerStats: payload };
    case SET_PLAYER_DATA:
      return { ...state, playerData: payload };
    default:
      return state;
  }
}

export default MultiReducer;
