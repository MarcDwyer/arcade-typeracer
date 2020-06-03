import { Character } from "../util";
import { Action } from "./main";
import { Phases } from "../enums";

export type TextData = {
  totalWords: number;
  text: Character[];
};

export type Statuses = "start" | "prepare" | "loaded" | "waiting" | "complete";

export type Mode = "single" | "multi";

export type StatusType = {
  phase: Statuses;
  mode: Mode | null;
};
export type TData = {
  currIndex: number;
  error: string | null;
  value: string;
  textData: TextData | null;
  countdown: number | null;
  status: StatusType;
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol(),
  COMPLETE = Symbol(),
  CHANGE_STATUS = Symbol(),
  SET_COUNTDOWN = Symbol();

const initState: TData = {
  error: null,
  currIndex: 0,
  textData: null,
  value: "",
  countdown: null,
  status: {
    mode: null,
    phase: "waiting",
  },
};

function TypingReducer(state: TData = initState, { type, payload }: Action) {
  switch (type) {
    case INC_INDEX:
      return payload;
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_TYPING:
      return {
        ...state,
        ...payload,
      };
    case COMPLETE:
      return { ...state, status: { ...state.status, phase: Phases.complete } };
    case SET_COUNTDOWN:
      return { ...state, countdown: payload };
    case CHANGE_STATUS:
      return { ...state, status: { ...state.status, phase: payload } };
    default:
      return state;
  }
}

export default TypingReducer;
