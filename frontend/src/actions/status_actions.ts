import { PhaseTypes, CHANGE_PHASE } from "../reducers/status_reducer";

/**
 * Typically after an action is made, we want to change the phase of the game
 */
export function changePhase(phase: PhaseTypes) {
  return {
    type: CHANGE_PHASE,
    payload: phase,
  };
}
