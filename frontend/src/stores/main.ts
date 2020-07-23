import GameState from "./gameStore";
import CountdownState from "./countdownStore";
import { createContext } from "react";

import { observable, reaction, action } from "mobx";
import { Phases, PayloadTypes } from "../enums";
import { isDev } from "../util";

function handleEvts(msg: MessageEvent, store: Store) {
  try {
    const data = JSON.parse(msg.data);
    if (!("type" in data)) throw "Invalid payload format";
    switch (data.type) {
      case PayloadTypes.single_typing_text:
        store.gameData.setSinglePayload(data);
        break;
    }
  } catch (err) {
    console.error(err);
  }
}

export class Store {
  @observable
  socket: null | WebSocket = null;
  @observable
  error: string | null = null;

  countdown = new CountdownState();
  gameData = new GameState();

  constructor() {
    reaction(
      () => this.socket,
      (socket) => {
        if (socket) {
          socket.addEventListener("message", (msg) => handleEvts(msg, this));
        }
      },
    );
    reaction(() => this.gameData.phase, this.handlePhase);
    reaction(() => this.countdown.timer, this.triggerStats);
  }

  @action
  private handlePhase = () => {
    const { phase } = this.gameData;
    switch (phase) {
      case Phases.countdown:
        this.countdown.setTimer(
          8,
          () => this.gameData.changePhase(Phases.typing),
        );
        break;
      case Phases.typing:
        const dur = this.gameData.duration || 120;
        this.countdown.setTimer(
          dur,
          () => this.gameData.changePhase(Phases.complete),
        );
        break;
      case Phases.complete:
        this.countdown.stopCounter();
        break;
      default:
        console.log(`No case found for ${phase}`);
    }
  };
  triggerStats = () => {
    if (this.gameData.phase === Phases.typing && this.countdown.timer) {
      this.gameData.calcStats(this.countdown.timer);
    }
  };
}

export default createContext(new Store());
