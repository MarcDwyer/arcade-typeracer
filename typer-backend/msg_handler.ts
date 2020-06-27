import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { PayloadTypes } from "./enums.ts";
import { textData } from "./typing_data.ts";
import Player, { PlayerData } from "./player.ts";

import room, { Room } from "./rooms.ts";

type Data = {
  type: string;
  payload: any;
};

export interface MyWebSocket extends WebSocket {
  player: Player;
  room: Room;
}

export default async function HandleMsg(ws: MyWebSocket, msg: string) {
  const data: Data = JSON.parse(msg);

  switch (data.type) {
    case PayloadTypes.singleTypingText:
      const randomTxt = textData[Math.floor(Math.random() * textData.length)];
      await ws.send(
        JSON.stringify({
          type: PayloadTypes.singleTypingText,
          payload: randomTxt,
        })
      );
      break;
    case PayloadTypes.joinRoom:
      const { username } = data.payload;
      const { player, players } = room.joinRoom(username, ws);
      await ws.send(
        JSON.stringify({
          payload: { player, players },
          type: PayloadTypes.roomData,
        })
      );
      break;
    default:
      console.log("No case found for " + data.type);
  }
}
