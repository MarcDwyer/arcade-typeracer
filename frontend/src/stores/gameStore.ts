import { Character } from "../util";
import { observable, action, reaction } from "mobx";
import { Store } from "./main";
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

export default class GameStore {
  @observable text: Character[] | null = null;
  wordCount: number = 0;
  @observable
  currIndex: number = 0;
  @observable value: string = "";
  wpm: number = 0;
  progress: number = 0;
  @observable error: string | null = null;
  duration: null | number = null;
  multi: Multi = {
    playerData: null,
    playerStats: [],
  };

  constructor(private store: Store) {
    reaction(() => this.currIndex, this.monitorIndex);
  }

  @action
  monitorIndex = () => {
    if (this.text && this.currIndex === this.text.length) {
      this.store.phase = Phases.complete;
    }
  };
  @action handleTyping = (char: string) => {
    const { currIndex, error } = this;
    if (!this.text) return;
    const currChar = this.text[currIndex];
    if (char !== currChar.char) {
      this.error = "Invalid character";
      return;
    }
    if (error) this.error = null;
    if (char === " ") {
      this.value = "";
    } else {
      this.value += char;
    }
    currChar.completed = true;
    ++this.currIndex;
  };
}
