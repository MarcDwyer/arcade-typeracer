import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { PayloadTypes } from "./enums.ts";
import Player from "./player.ts";

import room from "./rooms.ts";
import { randomTxt } from "./util.ts";
import { SingleStruct } from "./payload_struct.ts";

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
      const sPayload: SingleStruct = {
        type: PayloadTypes.singleTypingText,
        payload: randomTxt(),
      };
      await ws.send(
        JSON.stringify(sPayload),
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
