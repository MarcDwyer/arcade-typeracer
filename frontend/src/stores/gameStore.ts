import { observable, action, extendObservable } from "mobx";
import { Character } from "../util";
import { createContext } from "react";
import { Phases } from "../enums";

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

type KeysOfPhases = keyof typeof Phases;
export type PhaseTypes = typeof Phases[KeysOfPhases];

class Game {
  phase: PhaseTypes = Phases.waiting;
  text: Character[] | null = null;
  wordCount: number = 0;
  currIndex: number = 0;
  value: string = "";
  wpm: number = 0;
  progress: number = 0;
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
