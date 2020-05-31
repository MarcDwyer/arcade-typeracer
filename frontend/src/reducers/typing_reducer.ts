import { Character } from "../util";
import { Action } from "./main";

export type TData = {
  currIndex: number;
  error: string | null;
  value: string;
  typing_text: Character[] | null;
  completed: boolean;
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol();

const initState: TData = {
  error: null,
  currIndex: 0,
  typing_text: null,
  value: "",
  completed: false,
};

function TypingReducer(state: TData = initState, { type, payload }: Action) {
  switch (type) {
    case INC_INDEX:
      return payload;
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_TYPING:
      return { ...state, typing_text: payload as Character[] };
    default:
      return state;
  }
}

export default TypingReducer;
