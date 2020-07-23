import { Character, transformChar, calcWpm, getProgress } from "../util";
import { observable, action, reaction } from "mobx";
import { Phases } from "../enums";
import { PhaseTypes } from "./phaseStore";
import { SingleStruct } from "../payload_struct";

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

export class Statistics {
  wpm: number = 0;
  progress: number = 0;

  setStats(wpm: number, progress: number) {
    wpm = Math.trunc(wpm);
    progress = Math.trunc(progress);
    this.wpm = wpm;
    this.progress = progress;
  }
}

export default class GameStore {
  @observable
  text: Character[] | null = null;
  @observable
  currIndex: number = 0;
  @observable
  value: string = "";
  @observable
  error: string | null = null;
  @observable
  phase: PhaseTypes = Phases.waiting;

  @observable
  stats: Statistics = new Statistics();

  gameMode: string | null = null;
  private initState: GameStore;

  wordCount: number = 0;
  duration: null | number = null;
  multi: Multi = {
    playerData: null,
    playerStats: [],
  };

  constructor() {
    reaction(() => this.currIndex, this.monitorIndex);
    console.log("constructor ran...");
    this.initState = { ...this };
  }
  @action
  handleTyping = (char: string) => {
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
  @action
  setSinglePayload = ({ payload }: SingleStruct) => {
    const { time, text } = payload;
    this.duration = time;
    this.text = transformChar(text);
    this.phase = Phases.loaded;
  };
  @action
  changePhase(phase: PhaseTypes) {
    this.phase = phase;
  }
  @action
  private monitorIndex = () => {
    const { currIndex } = this;
    if (this.text && currIndex === this.text.length) {
      this.changePhase(Phases.complete);
    }
  };
  @action
  resetGame = () => {
    const notThis = {
      initState: true,
    };
    for (const [k, v] of Object.entries(this.initState)) {
      if (!(k in notThis) && k in this) {
        console.log(`found ${k} value: ${v}`);
        //@ts-ignore
        this[k] = v;
      }
    }
  };
  @action
  calcStats = (timer: number) => {
    const { duration, text, currIndex } = this;
    if (!duration || !text) return;
    const diff = duration - timer;

    const wpm = calcWpm(currIndex, diff);
    const progress = getProgress(text.length, currIndex);

    this.stats.setStats(wpm, progress);
  };
}
