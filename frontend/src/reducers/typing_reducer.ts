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
        wordCount: 1,
        text: payload,
      };
    default:
      return state;
  }
}

export default TypingReducer;
