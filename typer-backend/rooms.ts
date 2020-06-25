import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Player from "./player.ts";
// Why am i not using maps
class Rooms {
  public rooms: Map<string, Room> = new Map();
  private lastRoom: Room | undefined;

  joinRoom(user: string): Player {
    if (
      !this.lastRoom ||
      //@ts-ignore
      this.lastRoom.filled
    ) {
      this.lastRoom = this.createRoom();
    }
    const playerData = this.lastRoom.addPlayer(user);
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

class Room {
  private playerCount: number = 0;
  public filled: boolean = false;
  public players: Map<number, Player> = new Map();
  constructor(public roomId: string) {}

  addPlayer(user: string): Player {
    let count = ++this.playerCount;
    if (count >= 8) {
      this.filled = true;
    }
    const newPlayer = new Player(user, count, this.roomId);
    const player = this.players.set(count, newPlayer).get(count);
    //@ts-ignore
    return player;
  }
}

export default new Rooms();
