import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Player, { PlayerStats } from "./player.ts";
import { MyWebSocket } from "./msg_handler.ts";
import { Phases, PhaseTypes, PayloadTypes } from "./enums.ts";
import { randomTxt } from "./util.ts";
import { TextData } from "./typing_data.ts";
// Why am i not using maps
class Rooms {
  public rooms: Map<string, Room> = new Map();
  private lastRoom: Room | undefined;

  joinRoom(user: string, ws: MyWebSocket) {
    if (!this.lastRoom || this.lastRoom.phase !== Phases.waiting) {
      this.lastRoom = this.createRoom();
    }
    this.lastRoom.addPlayer(user, ws);
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

export class Room {
  private playerCount: number = 0;
  public text: TextData = randomTxt();
  public players: Map<number, Player> = new Map();
  public phase: PhaseTypes = Phases.waiting;

  constructor(public roomId: string) {}

  addPlayer(user: string, ws: MyWebSocket): void {
    // Count is used as key to avoid naming conflicts within the map
    let count = ++this.playerCount;
    if (count >= 2) {
      this.phase = Phases.loaded;
      this.broadcast({ type: PayloadTypes.phaseChange, phase: this.phase });
    }
    const newPlayer = new Player(user, count, this, ws);
    this.players.set(count, newPlayer);
    ws.player = newPlayer;
  }
  playerStatsList(): PlayerStats[] {
    const playerStats = [];
    for (const player of this.players.values()) {
      playerStats.push(player.playerStats);
    }
    return playerStats;
  }
  async broadcast(data: any) {
    data = JSON.stringify(data);
    for (const player of this.players.values()) {
      if (player.ws && !player.ws.isClosed) {
        await player.ws.send(data).catch((err) => console.log(err));
      }
    }
  }
}

export default new Rooms();
