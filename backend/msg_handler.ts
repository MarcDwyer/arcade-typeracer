import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { RequestTypes } from "./enums.ts";
import { TypingText } from "./typing_data.ts";

type RequestPayload = {
  type?: string;
  payload: any;
};
export function handleMsg(msg: string, ws: WebSocket) {
  try {
    const parsed: RequestPayload = JSON.parse(msg);
    if (!("type" in parsed)) throw "No type property found in message";
    switch (parsed.type) {
      case RequestTypes.typing_text:
        ws.send(
          JSON.stringify(
            { type: RequestTypes.typing_text, payload: TypingText.john_wick },
          ),
        );
        break;
      default:
        throw `Type ${parsed.type} could not be handled`;
    }
  } catch (err) {
    console.log(err);
  }
}
