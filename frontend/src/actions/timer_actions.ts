import { Dispatch } from "redux";
import { GetState } from "./action_types";
import {
  SET_COUNTDOWN,
  UPDATE_COUNTDOWN,
  Countdown,
  CLEAR_COUNTDOWN,
} from "../reducers/timer_reducer";
import { PhaseTypes, CHANGE_PHASE } from "../reducers/status_reducer";

export function setTimer(duration: number, nextPhase: PhaseTypes) {
  return (dispatch: Dispatch, getState: GetState) => {
    const newCountdown: Countdown = {
      countdown: duration,
      interval: setInterval(() => {
        const { countdown } = getState().timer;
        if (!countdown) {
          console.error("No countdown timer found");
          return;
        }
        let future = countdown - 1;
        if (!future) {
          dispatch({ type: CHANGE_PHASE, payload: nextPhase });
          dispatch({ type: CLEAR_COUNTDOWN });
          return;
        }
        dispatch({
          type: UPDATE_COUNTDOWN,
          payload: future,
        });
      }, 1000),
    };

    dispatch({
      type: SET_COUNTDOWN,
      payload: newCountdown,
    });
  };
}
