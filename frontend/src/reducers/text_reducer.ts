import { Character } from "../util";
import { Action } from "./main";

export type TextData = {
  text: Character[] | null;
  wordCount: number;
  error: string | null;
  currIndex: number;
  value: string;
  wpm: number | null;
  duration: null | number;
};

const initState: TextData = {
  text: null,
  duration: null,
  wordCount: 0,
  error: null,
  currIndex: 0,
  value: "",
  wpm: null,
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol(),
  FINALIZE_TYPING = Symbol(),
  RESET_GAME = Symbol();

export default function TextReducer(
  state: TextData = initState,
  { payload, type }: Action,
) {
  switch (type) {
    case INC_INDEX:
      return { ...state, ...payload };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_TYPING:
      return { ...state, text: payload.text, duration: payload.duration };
    case FINALIZE_TYPING:
      return { ...state, wpm: payload };
    case RESET_GAME:
      return { ...initState };
    default:
      return state;
  }
}
