import { Dispatch } from "redux";
import { SET_WEBSOCKET } from "../reducers/socket_reducer";
import { PayloadTypes } from "../enums";
import { SET_TYPING } from "../reducers/game_reducer";
import { WsPayload } from "./action_types";
import { transformChar } from "../util";

import io from "socket.io-client";

function handleEvents(ws: WebSocket, dispatch: Dispatch) {
  ws.addEventListener("message", (msg) => {
    try {
      const data: WsPayload = JSON.parse(msg.data);
      if (!("type" in data)) throw "No type property in payload";
      switch (data.type) {
        case PayloadTypes.typing_text:
          dispatch({ type: SET_TYPING, payload: transformChar(data.payload) });
          break;
      }
    } catch (e) {
      console.error(e);
    }
  });
}
export function setWs(url?: string) {
  const aUrl = url || `ws://localhost:1337/ws/`;
  return (dispatch: Dispatch) => {
    const ws = new WebSocket(aUrl);

    ws.onopen = () => {
      console.log("ws opened");
      dispatch({
        type: SET_WEBSOCKET,
        payload: ws,
      });
    };
    ws.onerror = (er) => console.log("Error connecting WS " + er);
  };
}
