import { MyWebSocket } from "./msg_handler.ts";
import { Room } from "./rooms.ts";

export type PlayerStats = {
  wpm: number;
  progress: number;
  isConnected: boolean;
  username: string;
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
    public ws: MyWebSocket | null,
  ) {}

  setWpm(wpm: number) {
    this.wpm = wpm;
  }
  handleDisconnect() {
    this.ws = null;
    this.isConnected = false;
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