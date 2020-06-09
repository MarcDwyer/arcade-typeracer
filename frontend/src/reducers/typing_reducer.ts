import { Character } from "../util";
import { Action } from "./main";

export type TextData = {
  text: Character[] | null;
  wordCount: number;
  error: string | null;
  currIndex: number;
  value: string;
  wpm: number | null;
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol(),
  FINALIZE_TYPING = Symbol();

const initState: TextData = {
  text: null,
  wordCount: 0,
  error: null,
  currIndex: 0,
  value: "",
  wpm: null,
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
        wordCount: 0,
        text: payload,
      };
    case FINALIZE_TYPING:
      return { ...state, wpm: payload };
    default:
      return state;
  }
}

export default TypingReducer;
