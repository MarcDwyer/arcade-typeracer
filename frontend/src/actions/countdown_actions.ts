import {
  SET_COUNTDOWN,
  CLEAR_COUNTDOWN,
  SET_INTERVAL,
  SET_DURATION,
} from "../reducers/countdown_reducer";
import { Dispatch } from "redux";
import { GetState } from "./typing_actions";
import { CHANGE_PHASE } from "../reducers/status_reducer";
import { Phases } from "../enums";
/**
 * 
 * @param duration amount of seconds for the timer
 */
export function setCountdown() {
  return (dispatch: Dispatch, getState: GetState) => {
    const initTimer = () => {
      const { timer, status } = getState();
      if (!timer) return;
      let dur = timer.countdown || timer.duration;
      let futureDur = dur - 1;
      if (futureDur) {
        dispatch({
          type: SET_COUNTDOWN,
          payload: futureDur,
        });
      } else {
        dispatch({
          type: CLEAR_COUNTDOWN,
        });
        dispatch({
          type: CHANGE_PHASE,
          payload: status.phase === Phases.typing
            ? Phases.complete
            : Phases.typing,
        });
      }
    };
    initTimer();
    dispatch({
      type: SET_INTERVAL,
      payload: setInterval(initTimer, 1000),
    });
  };
}

export function setDuration(duration: number) {
  return {
    type: SET_DURATION,
    payload: duration,
  };
}

export const clearCountdown = () => ({
  type: CLEAR_COUNTDOWN,
});
