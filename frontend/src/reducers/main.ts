import { combineReducers } from "redux";
import TypingReducer, { TextData } from "./typing_reducer";
import CountDownReducer, { CountDownState } from "./countdown_reducer";
import StatusReducer, { StatusState } from "./status_reducer";

export interface Action {
  payload: any;
  type: Symbol;
}

export declare namespace ReduxStore {
  export type TypingData = TextData;

  export type TxtData = TextData;

  export type State = {
    textData: TypingData;
    countdown: CountDownState;
    status: StatusState;
  };
}

export default combineReducers({
  textData: TypingReducer,
  status: StatusReducer,
  countdown: CountDownReducer,
});
