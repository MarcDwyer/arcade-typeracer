import { PhaseTypes, CHANGE_PHASE } from "../reducers/status_reducer";

export function setPhasers(phase: PhaseTypes) {
  return {
    type: CHANGE_PHASE,
    payload: phase,
  };
}
