export default class Player {
  public wpm: number = 0;
  public progress: number = 0;

  constructor(
    public userName: string,
    public userKey: number,
    public roomKey: string
  ) {}

  setWpm(wpm: number) {
    this.wpm = wpm;
  }
}
