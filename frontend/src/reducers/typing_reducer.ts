import { Character, TimeResults } from "../util";
import { Action } from "./main";

export type TData = {
  currIndex: number;
  error: string | null;
  value: string;
  textData: TextData | null;
  completed: boolean;
  timer: TimeResults | null;
};
export type TextData = {
  totalWords: number;
  text: Character[];
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol(),
  SET_TIMER = Symbol(),
  COMPLETE = Symbol();

const initState: TData = {
  error: null,
  currIndex: 0,
  textData: null,
  value: "",
  completed: false,
  timer: null,
};

function TypingReducer(state: TData = initState, { type, payload }: Action) {
  switch (type) {
    case INC_INDEX:
      return payload;
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_TYPING:
      return { ...state, textData: payload as TextData };
    case SET_TIMER:
      return { ...state, timer: payload };
    case COMPLETE:
      return { ...state, completed: true, timer: null };
    default:
      return state;
  }
}

export default TypingReducer;
