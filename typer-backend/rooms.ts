import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Player, { PlayerData, PlayerStats } from "./player.ts";
import { MyWebSocket } from "./msg_handler.ts";
// Why am i not using maps
class Rooms {
  public rooms: Map<string, Room> = new Map();
  private lastRoom: Room | undefined;

  joinRoom(user: string, ws: MyWebSocket): AddPlayerData {
    if (!this.lastRoom || this.lastRoom.filled) {
      this.lastRoom = this.createRoom();
    }
    const playerData = this.lastRoom.addPlayer(user, ws);
    return playerData;
  }
  private createRoom(): Room {
    const id = v4.generate();
    const room = new Room(id);
    this.rooms.set(id, room);
    const newRoom = this.rooms.get(id);
    //@ts-ignore
    return newRoom;
  }
}

type AddPlayerData = {
  player: PlayerData;
  players: PlayerStats[];
};
export class Room {
  private playerCount: number = 0;
  public filled: boolean = false;
  public players: Map<number, Player> = new Map();
  constructor(public roomId: string) {}

  addPlayer(user: string, ws: MyWebSocket): AddPlayerData {
    let count = ++this.playerCount;
    if (count >= 8) {
      this.filled = true;
    }
    const newPlayer = new Player(user, count, this.roomId, ws);
    const player = this.players.set(count, newPlayer).get(count);
    //@ts-ignore
    ws.player = player;
    ws.room = this;
    return {
      //@ts-ignore
      player: player?.playerData,
      //@ts-ignore
      players: this.getPlayerStatsList(player?.userKey),
    };
  }
  getPlayerStatsList(currPlayer: number): PlayerStats[] {
    const pData: PlayerStats[] = [];
    for (const player of this.players.values()) {
      if (player.userKey !== currPlayer) {
        pData.push(player.playerStats);
      }
    }
    return pData;
  }
}

export default new Rooms();
