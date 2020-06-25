import Rooms from "./rooms.ts";

for (let x = 0; x < 12; x++) {
  Rooms.joinRoom("marc");
}

console.log(Rooms.rooms);
