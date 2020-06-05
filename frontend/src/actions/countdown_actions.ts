import { SET_COUNTDOWN, CLEAR_COUNTDOWN } from "../reducers/countdown_reducer";

/**
 * 
 * @param count should be in seconds, is later convert to the time in the future
 */
export function setCountdown(count: number) {
  return {
    type: SET_COUNTDOWN,
    payload: (count * 1000) + Date.now(),
  };
}

export const clearCountdown = () => ({
  type: CLEAR_COUNTDOWN,
});
