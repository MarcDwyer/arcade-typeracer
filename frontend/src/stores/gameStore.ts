import { Character } from "../util";

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

type Multi = {
  playerStats: PlayerStats[];
  playerData: PlayerData | null;
};

export class GameData {
  text: Character[] | null = null;
  wordCount: number = 0;
  currIndex: number = 0;
  value: string = "";
  wpm: number = 0;
  progress: number = 0;
  error: string | null = null;
  duration: null | number = null;
  multi: Multi = {
    playerData: null,
    playerStats: [],
  };
}

export default class GameStore {
  game = new GameData();

  reset = () => {
    this.game = new GameData();
  };
}
