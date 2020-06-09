import { Action } from "./main";

export type WebSocketState = WebSocket | null;

export const SET_WEBSOCKET = Symbol();

export default function SocketReducer(
  state: WebSocketState = null,
  { type, payload }: Action,
) {
  switch (type) {
    case SET_WEBSOCKET:
      return payload;
    default:
      return state;
  }
}
