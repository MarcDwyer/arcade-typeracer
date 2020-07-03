import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
} from "https://deno.land/std/ws/mod.ts";

import HandleMsg, { MyWebSocket } from "./msg_handler.ts";

async function handleWs(sock: MyWebSocket) {
  try {
    for await (const ev of sock) {
      const { room, player } = sock;
      if (typeof ev === "string") {
        //@ts-ignore
        await HandleMsg(sock, ev);
      } else if (ev instanceof Uint8Array) {
        // binary message
        console.log("ws:Binary", ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        // ping
        console.log("ws:Ping", body);
      } else if (isWebSocketCloseEvent(ev)) {
        // close
        const { code, reason } = ev;
        console.log("ws:Close", code, reason);
        player.isConnected = false;
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);
    sock.room.players.delete(sock.player.userKey);
    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  }
}

if (import.meta.main) {
  /** websocket echo server */
  const port = Deno.args[0] || "1867";
  console.log(`websocket server is running on :${port}`);
  for await (const req of serve(`:${port}`)) {
    const { conn, r: bufReader, w: bufWriter, headers } = req;
    acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })
      //@ts-ignore
      .then(handleWs)
      .catch(async (err) => {
        console.error(`failed to accept websocket: ${err}`);
        await req.respond({ status: 400 });
      });
  }
}
