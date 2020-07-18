import { action, observable } from "mobx";

export default class Countdown {
  interval: number | null = null;
  @observable
  timer: number = 0;

  @action
  setTimer = (time: number, nextPhase?: () => void) => {
    this.timer = time;
    this.interval = setInterval(() => {
      --this.timer;
      if (!this.timer && this.interval) {
        clearInterval(this.interval);
        if (nextPhase) nextPhase();
      }
    }, 1000);
  };
}
