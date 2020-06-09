import { PhaseTypes, CHANGE_PHASE } from "../reducers/status_reducer";

/**
 * Changing the phase allows mode_handler to dispatch required actions
 * It's a way of controlling the 3 reducers
 */
export function changePhase(phase: PhaseTypes) {
  return {
    type: CHANGE_PHASE,
    payload: phase,
  };
}
