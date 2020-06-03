import { SET_TIMER } from "../reducers/timer_reducer";
import { Dispatch } from "redux";
import { getTime } from "../util";
import { COMPLETE } from "../reducers/typing_reducer";

/**
 * 
 * @param time time should be in seconds, it is then converted to the futuretime in milliseconds
 * @returns in milliseconds
 */
export const setTime = (time: number) => {
  time = time * 1000;
  return function (dispatch: Dispatch) {
    const futureTime = Date.now() + time;
    let interval: undefined | number;

    const initTimer = () => {
      const time = getTime(futureTime);
      if (!time) {
        clearInterval(interval);
        dispatch({
          type: COMPLETE,
        });
      }
      dispatch({
        type: SET_TIMER,
        payload: time,
      });
    };
    interval = setInterval(initTimer, 1000);
  };
};
