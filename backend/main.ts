import { serve } from "https://deno.land/std/http/mod.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";
import { handleMsg } from "./msg_handler.ts";

const s = serve({ port: 1337 });

for await (const req of s) {
  const { conn, r: bufReader, w: bufWriter, headers } = req;
  acceptWebSocket({
    conn,
    bufReader,
    bufWriter,
    headers,
  })
    .then(handleWs)
    .catch(async (e) => {
      console.error(`failed to accept websocket: ${e}`);
      await req.respond({ status: 400 });
    });
}

async function handleWs(ws: WebSocket) {
  try {
    for await (const ev of ws) {
      if (typeof ev === "string") {
        // text message
        console.log("ws:Text", ev);
        handleMsg(ev, ws);
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
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!ws.isClosed) {
      await ws.close(1000).catch(console.error);
    }
  }
}
