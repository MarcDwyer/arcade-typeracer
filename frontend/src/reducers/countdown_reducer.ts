import { Action } from "./main";

export const SET_COUNTDOWN = Symbol(),
  SET_INTERVAL = Symbol(),
  SET_DURATION = Symbol(),
  CLEAR_COUNTDOWN = Symbol();

export type CountdownState = Countdown;

export type Countdown = {
  duration: number;
  countdown: number | null;
  interval: number | null;
};

const initCountdown: Countdown = {
  duration: 0,
  countdown: null,
  interval: null,
};
export default function CountDownReducer(
  state: CountdownState = initCountdown,
  { type, payload }: Action,
) {
  switch (type) {
    case SET_COUNTDOWN:
      return { ...state, countdown: payload };
    case SET_INTERVAL:
      return { ...state, interval: payload };
    case SET_DURATION:
      return { ...state, duration: payload };
    case CLEAR_COUNTDOWN:
      if (state && state.interval) clearInterval(state.interval);
      return null;
    default:
      return state;
  }
}
