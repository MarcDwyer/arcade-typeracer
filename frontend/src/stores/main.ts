import GameState from "./gameStore";
import { PhaseTypes } from "./phaseStore";
import CountdownState from "./countdownStore";
import { createContext } from "react";

import { observable, reaction, action } from "mobx";
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

class Store {
  @observable
  socket: null | WebSocket = null;
  @observable
  error: string | null = null;
  @observable
  gameData = new GameState();
  @observable
  phase: PhaseTypes = Phases.waiting;
  countdown = new CountdownState();

  constructor() {
    reaction(() => this.socket, (socket) => {
      if (socket) {
        console.log("this is gamer");
        socket.addEventListener("message", (msg) => handleEvts(msg, this));
      }
    });
    reaction(() => this.phase, this.handlePhase);
  }
  @action
  setSinglePayload = ({ payload }: SingleStruct) => {
    const { time, text } = payload;
    this.gameData.game.duration = time;
    this.gameData.game.text = transformChar(text);
    this.phase = Phases.loaded;
  };
  @action
  private handlePhase = () => {
    const { phase } = this;
    console.log(`phase has been set to: ${phase}`);
    switch (phase) {
      case Phases.countdown:
        this.countdown.setTimer(8, () => this.phase = Phases.typing);
        break;
      default:
        console.log(`No case found for ${phase}`);
    }
  };
}

export default createContext(new Store());
