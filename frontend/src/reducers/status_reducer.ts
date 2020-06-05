import { Phases } from "../enums";
import { Action } from "./main";

type KeysOfPhases = keyof typeof Phases;
export type PhaseTypes = typeof Phases[KeysOfPhases];

export type Mode = "single" | "multi";

export type StatusState = {
  phase: PhaseTypes;
  mode: Mode | null;
};

const initStatus: StatusState = {
  phase: Phases.waiting,
  mode: null,
};

const SET_STATUS = Symbol(),
  SET_MODE = Symbol();

export default function StatusReduer(
  state: StatusState = initStatus,
  { type, payload }: Action,
) {
  switch (type) {
    case SET_STATUS:
      return { ...state, status: payload };
    case SET_MODE:
      return { ...state, mode: payload };
    default:
      return state;
  }
}
