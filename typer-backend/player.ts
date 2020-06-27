import { MyWebSocket } from "./msg_handler.ts";

export type PlayerStats = {
  wpm: number;
  username: string;
  progress: number;
};

export type PlayerData = {
  wpm: number;
  username: string;
  progress: number;
  userKey: number;
  roomKey: string;
};

export default class Player {
  private wpm: number = 0;
  private progress: number = 0;
  constructor(
    private username: string,
    public userKey: number,
    private roomKey: string,
    public ws: MyWebSocket
  ) {}

  setWpm(wpm: number) {
    this.wpm = wpm;
  }
  get playerStats(): PlayerStats {
    //@ts-ignore
    const { username, wpm, progress } = this;
    return { username, wpm, progress };
  }
  get playerData(): PlayerData {
    const { username, roomKey, userKey, wpm, progress } = this;
    return { username, roomKey, userKey, wpm, progress };
  }
}
