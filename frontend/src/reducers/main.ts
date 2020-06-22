import { combineReducers } from "redux";
import GameReducer, { GameData } from "./game_reducer";
import SocketReducer, { WebSocketState } from "./socket_reducer";
import ErrorReducer, { ErrorState } from "./error_reducer";

export interface Action {
  payload: any;
  type: Symbol;
}

export declare namespace ReduxStore {
  export type State = {
    gameData: GameData;
    socket: WebSocketState;
    error: ErrorState;
  };
}

export default combineReducers({
  gameData: GameReducer,
  socket: SocketReducer,
  error: ErrorReducer,
});
