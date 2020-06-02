import { combineReducers } from "redux";
import TypingReducer, { TData, TextData } from "./typing_reducer";
import StatusReducer, { StatusState } from "./status_reducer";
import TimerReducer, { TimeState } from "./timer_reducer";

export type Action = {
  payload?: any;
  type: Symbol;
};

export declare namespace ReduxStore {
  export type TypingData = TData;

  export type RTimeState = TimeState;

  export type TxtData = TextData;

  export type RStatusState = StatusState;

  export type State = {
    typing: TypingData;
    timer: RTimeState;
    status: RStatusState;
  };
}

export default combineReducers({
  typing: TypingReducer,
  status: StatusReducer,
  timer: TimerReducer,
});
