import { observable, action } from "mobx";
import { Character } from "../util";
import { createContext } from "react";

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

class Game {
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

class GameData {
  @observable
  game = new Game();

  @action
  reset = () => {
    this.game = new Game();
  };
}
export default createContext(new GameData());
