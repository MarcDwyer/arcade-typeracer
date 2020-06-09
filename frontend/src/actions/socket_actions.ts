import { Dispatch } from "redux";
import { SET_WEBSOCKET } from "../reducers/socket_reducer";

function handleEvents(ws: WebSocket, dispatch: Dispatch) {
  ws.addEventListener("message", (msg) => {
    console.log(msg.data);
  });
}
export function setWs(ws: WebSocket) {
  return (dispatch: Dispatch) => {
    handleEvents(ws, dispatch);
    dispatch({ type: SET_WEBSOCKET, payload: ws });
  };
}
