import { PhaseTypes, CHANGE_PHASE } from "../reducers/status_reducer";
import { Dispatch } from "redux";
import { GetState } from "./action_types";
import { Phases } from "../enums";
import { RESET_TEXT } from "../reducers/text_reducer";

export function setPhasers(phase: PhaseTypes) {
  return (dispatch: Dispatch) => {
    console.log(phase);
    if (phase === Phases.waiting) {
      console.log("resetting...");
      dispatch({
        type: RESET_TEXT,
      });
    }
    dispatch({
      type: CHANGE_PHASE,
      payload: phase,
    });
  };
}
