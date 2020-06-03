import { combineReducers } from "redux";
import TypingReducer, { TData, TextData } from "./typing_reducer";

export type Action = {
  payload?: any;
  type: Symbol;
};

export declare namespace ReduxStore {
  export type TypingData = TData;

  export type TxtData = TextData;

  export type State = {
    typing: TypingData;
  };
}

export default combineReducers({
  typing: TypingReducer,
});
