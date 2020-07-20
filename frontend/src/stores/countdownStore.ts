import { action, observable } from "mobx";

export default class Countdown {
  @observable
  timer: number = 0;

  interval: number | null = null;

  @action
  setTimer = (time: number, nextPhase?: () => void) => {
    this.timer = time;
    this.interval = setInterval(() => {
      --this.timer;
      console.log("decd");
      if (!this.timer && this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        if (nextPhase) nextPhase();
      }
    }, 1000);
  };
  @action
  stopCounter = () => {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
    this.timer = 0;
  };
}
