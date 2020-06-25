import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { PayloadTypes } from "./enums.ts";
import { textData } from "./typing_data.ts";
import Room from "./rooms.ts";
import Player from "./player.ts";

type Data = {
  type: string;
  payload: any;
};

interface MyWebSocket extends WebSocket {
  playerData: Player;
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
      const playerData = Room.joinRoom(username);
      ws.playerData = playerData;
      await ws.send(JSON.stringify({ ...ws.playerData }));
      break;
    default:
      console.log("No case found for " + data.type);
  }
}
