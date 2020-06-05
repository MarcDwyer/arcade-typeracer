import { Character } from "../util";
import { Action } from "./main";
import { Phases } from "../enums";

export type TextData = {
  text: Character[] | null;
  wordCount: number;
  error: string | null;
  currIndex: number;
  value: string;
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol();

// TODO:
// Consider splitting into 3 different pieces of state.
// Although countdown and status rely on eachother somewhat.
// Perhaps find a better way
const initState: TextData = {
  text: null,
  wordCount: 0,
  error: null,
  currIndex: 0,
  value: "",
};

function TypingReducer(
  state: TextData = initState,
  { type, payload }: Action,
) {
  switch (type) {
    case INC_INDEX:
      return { ...state, ...payload };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_TYPING:
      return {
        ...state,
        text: payload,
      };
    default:
      return state;
  }
}

export default TypingReducer;
