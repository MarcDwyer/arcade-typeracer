import Rooms from "./rooms.ts";

for (let x = 0; x < 10; x++) {
  Rooms.joinRoom(`marc${x}`);
}

console.log(Rooms.rooms);
