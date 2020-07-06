import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { PayloadTypes, PhaseTypes } from "./enums.ts";
import Player, { PlayerData } from "./player.ts";

import room from "./rooms.ts";
import { randomTxt } from "./util.ts";
import { TextData } from "./typing_data.ts";

type Data = {
  type: string;
  payload: any;
};

export interface MyWebSocket extends WebSocket {
  player: Player;
}

export default async function HandleMsg(ws: MyWebSocket, msg: string) {
  const data: Data = JSON.parse(msg);

  switch (data.type) {
    case PayloadTypes.singleTypingText:
      await ws.send(
        JSON.stringify({
          type: PayloadTypes.singleTypingText,
          payload: randomTxt(),
        }),
      );
      break;
    case PayloadTypes.joinRoom:
      const { username } = data.payload;
      room.joinRoom(username, ws);
      await ws.send(
        JSON.stringify({
          type: PayloadTypes.roomData,
          payload: ws.player.initData,
        }),
      );
      break;
    default:
      console.log("No case found for " + data.type);
  }
}
