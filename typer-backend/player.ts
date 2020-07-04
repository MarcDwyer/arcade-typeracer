import { MyWebSocket } from "./msg_handler.ts";
import { Room } from "./rooms.ts";

export type PlayerStats = {
  wpm: number;
  username: string;
  progress: number;
  isConnected: boolean;
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
  public isConnected: boolean = true;
  constructor(
    private username: string,
    public userKey: number,
    public room: Room,
    public ws: MyWebSocket,
  ) {}

  setWpm(wpm: number) {
    this.wpm = wpm;
  }
  get playerStats(): PlayerStats {
    //@ts-ignore
    const { username, wpm, progress, isConnected } = this;
    return { username, wpm, progress, isConnected };
  }
  get playerData(): PlayerData {
    const { username, room, userKey, wpm, progress } = this;
    return { username, roomKey: room.roomId, userKey, wpm, progress };
  }
}
