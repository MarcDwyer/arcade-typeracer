import { combineReducers } from "redux";
import TypingReducer, { TData, TextData } from "./typing_reducer";
import TimerReducer, { TimeState } from "./timer_reducer";

export type Action = {
  payload?: any;
  type: Symbol;
};

export declare namespace ReduxStore {
  export type TypingData = TData;

  export type RTimeState = TimeState;

  export type TxtData = TextData;

  export type State = {
    typing: TypingData;
    timer: RTimeState;
  };
}

export default combineReducers({
  typing: TypingReducer,
  timer: TimerReducer,
});
