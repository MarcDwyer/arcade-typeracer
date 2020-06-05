import { Character } from "../util";
import { Action } from "./main";
import { Phases } from "../enums";

export type PhaseTypes =
  | "start"
  | "loaded"
  | "waiting"
  | "complete"
  | "countdown"
  | "typing";

export type Mode = "single" | "multi";

export type StatusType = {
  phase: PhaseTypes;
  mode: Mode | null;
};
export type TData = {
  textData: TextData;
  countdown: number | null;
  status: StatusType;
};
export type TextData = {
  text: Character[] | null;
  wordCount: number;
  error: string | null;
  currIndex: number;
  value: string;
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol(),
  COMPLETE = Symbol(),
  CHANGE_STATUS = Symbol(),
  SET_COUNTDOWN = Symbol();

const initState: TData = {
  textData: {
    text: null,
    wordCount: 0,
    error: null,
    currIndex: 0,
    value: "",
  },
  countdown: null,
  status: {
    mode: null,
    phase: "waiting",
  },
};

function TypingReducer(
  state: TData = initState,
  { type, payload }: Action,
) {
  switch (type) {
    case INC_INDEX:
      return { ...state, ...payload };
    case SET_ERROR:
      return { ...state, textData: { ...state.textData, error: payload } };
    case SET_TYPING:
      return {
        ...state,
        status: payload.status,
        textData: { ...state.textData, text: payload.text },
      };
    case COMPLETE:
      return { ...state, status: { ...state.status, phase: Phases.complete } };
    case SET_COUNTDOWN:
      return {
        ...state,
        countdown: payload.countdown,
        status: { ...state.status, phase: payload.phase },
      };
    case CHANGE_STATUS:
      return {
        ...state,
        countdown: null,
        status: { ...state.status, phase: payload },
      };
    default:
      return state;
  }
}

export default TypingReducer;
