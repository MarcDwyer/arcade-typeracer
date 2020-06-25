import { Phases } from "../enums";
import { Action } from "./main";

type KeysOfPhases = keyof typeof Phases;
export type PhaseTypes = typeof Phases[KeysOfPhases];

export type Mode = "single" | "multi";

export type StatusState = {
  phase: PhaseTypes;
  mode: Mode | null;
};

export const CHANGE_PHASE = Symbol();

const initState: StatusState = {
  phase: Phases.waiting,
  mode: null,
};

export default function StatusReducer(
  state: StatusState = initState,
  { type, payload }: Action,
) {
  switch (type) {
    case CHANGE_PHASE:
      return { ...state, phase: payload };
    default:
      return state;
  }
}
