import { v4 } from "https://deno.land/std/uuid/mod.ts";

// Why am i not using maps
class Rooms {
  public rooms: Map<string, Room> = new Map();
  private lastRoom: Room | undefined;

  joinRoom(user: string) {
    if (
      !this.lastRoom ||
      //@ts-ignore
      this.lastRoom.filled
    ) {
      this.lastRoom = this.createRoom();
    }
    const playerData = this.lastRoom.addPlayer(user, this.lastRoom.roomId);
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
/**
 * @paramType progress is how much of the text has been typed by the user
 * @paramType wpm - words per minute
 */
type Player = {
  user: string;
  wpm: number;
  progress: number;
  userKey: number;
  roomKey: string;
};

class Room {
  private playerCount: number = 0;
  public filled: boolean = false;
  public players: Map<number, Player> = new Map();
  constructor(public roomId: string) {}

  addPlayer(user: string, roomKey: string): Player {
    ++this.playerCount;
    if (this.playerCount >= 8) {
      this.filled = true;
    }
    const newPlayer: Player = {
      user,
      roomKey,
      wpm: 0,
      progress: 0,
      userKey: this.playerCount,
    };
    const player = this.players
      .set(this.playerCount, newPlayer)
      .get(this.playerCount);
    //@ts-ignore
    return player;
  }
}

export default new Rooms();
