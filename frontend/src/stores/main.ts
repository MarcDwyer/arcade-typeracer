import GameState from "./gameStore";
import { PhaseTypes } from "./phaseStore";
import CountdownState from "./countdownStore";
import { createContext } from "react";

import { observable, reaction, action, autorun } from "mobx";
import { Phases, PayloadTypes } from "../enums";
import { transformChar } from "../util";
import { SingleStruct } from "../payload_struct";

function handleEvts(msg: MessageEvent, store: Store) {
  try {
    const data = JSON.parse(msg.data);
    if (!("type" in data)) throw "Invalid payload format";
    switch (data.type) {
      case PayloadTypes.single_typing_text:
        store.setSinglePayload(data);
    }
  } catch (err) {
    console.error(err);
  }
}

export class Store {
  @observable
  socket: null | WebSocket = null;
  @observable error: string | null = null;
  @observable
  phase: PhaseTypes = Phases.waiting;
  countdown = new CountdownState();
  gameData: GameState;

  constructor() {
    reaction(
      () => this.socket,
      (socket) => {
        if (socket) {
          console.log("this is gamer");
          socket.addEventListener("message", (msg) => handleEvts(msg, this));
        }
      }
    );
    reaction(() => this.phase, this.handlePhase);
    this.gameData = new GameState(this);
  }
  @action
  setSinglePayload = ({ payload }: SingleStruct) => {
    const { time, text } = payload;
    this.gameData.duration = time;
    this.gameData.text = transformChar(text);
    this.phase = Phases.loaded;
  };
  @action
  private handlePhase = () => {
    const { phase } = this;
    switch (phase) {
      case Phases.countdown:
        this.countdown.setTimer(8, () => (this.phase = Phases.typing));
        break;
      case Phases.typing:
        const dur = this.gameData.duration || 120;
        this.countdown.setTimer(dur, () => (this.phase = Phases.complete));
        break;
      default:
        console.log(`No case found for ${phase}`);
    }
  };
  @action
  resetGame = () => {
    this.gameData = new GameState(this);
    this.countdown = new CountdownState();
    this.phase = Phases.waiting;
  };
  @action
  monitorIndex = () => {
    const { currIndex, text } = this.gameData;
    if (text) console.log(text.length);
    if (text && currIndex === text.length) {
      console.log("completed");
      this.phase = Phases.complete;
    }
  };
}

export default createContext(new Store());
