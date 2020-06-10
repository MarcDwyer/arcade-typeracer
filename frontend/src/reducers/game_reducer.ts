import { Action } from "./main";
import { Countdown, TextData, StatusState } from "./reducer_types";
import { Phases } from "../enums";

export type GameData = {
  textData: TextData;
  timer: Countdown;
  status: StatusState;
};

const timer = {
  duration: 0,
  countdown: null,
  interval: null,
};
const status = {
  mode: null,
  phase: Phases.waiting,
};
const textData = {
  text: null,
  wordCount: 0,
  error: null,
  currIndex: 0,
  value: "",
  wpm: null,
};
const initState: GameData = {
  textData,
  timer,
  status,
};

export const INC_INDEX = Symbol(),
  SET_ERROR = Symbol(),
  SET_TYPING = Symbol(),
  FINALIZE_TYPING = Symbol(),
  CHANGE_PHASE = Symbol(),
  CLEAR_COUNTDOWN = Symbol(),
  SET_COUNTDOWN = Symbol(),
  UPDATE_COUNTDOWN = Symbol();

function GameReducer(
  state: GameData = initState,
  { type, payload }: Action,
) {
  switch (type) {
    case INC_INDEX:
      return { ...state, textData: { ...state.textData, ...payload } };
    case SET_ERROR:
      return { ...state, textData: { ...state.textData, error: payload } };
    case SET_TYPING:
      return {
        ...state,
        status: { ...state.status, phase: Phases.loaded },
        textData: { ...state.textData, wordCount: 0, text: payload },
      };
    case UPDATE_COUNTDOWN:
      return { ...state, timer: { ...state.timer, countdown: payload } };
    case SET_COUNTDOWN:
      return {
        ...state,
        timer: payload.timer,
        status: { ...state.status, phase: payload.phase },
      };
    case FINALIZE_TYPING:
      if (state.timer.interval) clearInterval(state.timer.interval);
      return {
        textData: { ...state.textData, wpm: payload },
        status: { ...state.status, phase: Phases.complete },
        timer,
      };
    case CLEAR_COUNTDOWN:
      if (state.timer.interval) clearInterval(state.timer.interval);
      return {
        ...state,
        status: { ...state.status, phase: Phases.typing },
        timer,
      };
    case CHANGE_PHASE:
      return { ...state, status: { ...state.status, phase: payload } };
    default:
      return state;
  }
}

export default GameReducer;
