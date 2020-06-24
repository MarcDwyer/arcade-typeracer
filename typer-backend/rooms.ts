import { v4 } from "https://deno.land/std/uuid/mod.ts";


type RoomsType = {
    /** roomId should be uuid */
    [roomId: string]: Room;
}
// Why am i not using maps
export default class Rooms {
    public rooms: RoomsType = {};
    private lastRoomKey: string | undefined; 

    joinRoom(user: string) {
        let roomKey = this.lastRoomKey;
        if (!roomKey || this.rooms[roomKey].filled) {
            roomKey = this.createRoom();
        }
        const playerData = this.rooms[roomKey].addPlayer(user, roomKey)
    }
    createRoom() {
        const id = v4.generate()
        const room = new Room(id);
        this.rooms[id] = room
        return id;
    }
}


type Player = {
    user: string;
    wpm: number;
    userKey: number;
    roomKey: string;
}

type Players = {
    [userId: number]: Player;
}
export class Room {
    private playerCount: number = 0;
    public filled: boolean = false;
    public players: Players = {} 
    constructor(public roomId: string) {}

    addPlayer(user: string, roomKey: string): Player {
        ++this.playerCount
        if (this.playerCount >= 8) {
            this.filled = true;
        }
        const newUser: Player = {
            user,
            roomKey,
            wpm: 0,
            userKey: this.playerCount,
        }
        this.players[this.playerCount] = newUser
        return newUser
    }
}