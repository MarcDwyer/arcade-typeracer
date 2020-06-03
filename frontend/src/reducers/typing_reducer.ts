import { Character } from "../util";
import { Action } from "./main";

export type TextData = {
  totalWords: number;
  text: Character[];
};

export type Statuses = "start" | "waiting" | "loaded";

export type Mode = "single" | "multi";

export type Status = {
  currStatus: Statuses;
  mode: Mode | null;
};
export type TData = {
  currIndex: number;
  error: string | null;
  value: string;
  textData: TextData | null;
  completed: boolean;
  status: Status;
};
export const Status = {
  start: "start",
  waiting: "waiting",
  loaded: "loaded",
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol(),
  COMPLETE = Symbol(),
  CHANGE_STATUS = Symbol();

const initState: TData = {
  error: null,
  currIndex: 0,
  textData: null,
  value: "",
  completed: false,
  status: {
    mode: null,
    currStatus: "waiting",
  },
};

function TypingReducer(state: TData = initState, { type, payload }: Action) {
  switch (type) {
    case INC_INDEX:
      return payload;
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_TYPING:
      return { ...state, textData: payload as TextData };
    case COMPLETE:
      return { ...state, completed: true, timer: null };
    case CHANGE_STATUS:
      return { ...state, status: payload };
    default:
      return state;
  }
}

export default TypingReducer;
