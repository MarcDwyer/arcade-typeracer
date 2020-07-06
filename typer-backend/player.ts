import { MyWebSocket } from "./msg_handler.ts";
import { Room } from "./rooms.ts";
import { TextData } from "./typing_data.ts";
import { PhaseTypes } from "./enums.ts";

export type PlayerStats = {
  wpm: number;
  progress: number;
  isConnected: boolean;
  username: string;
};

export type PlayerData = {
  username: string;
  userKey: number;
  roomKey: string;
};

type InitData = {
  text: TextData;
  playerData: PlayerData;
  phase: PhaseTypes;
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
    const { username, room, userKey } = this;
    return { username, roomKey: room.roomId, userKey };
  }
  get initData(): InitData {
    return {
      text: this.room.text,
      phase: this.room.phase,
      playerData: this.playerData,
    };
  }
}
