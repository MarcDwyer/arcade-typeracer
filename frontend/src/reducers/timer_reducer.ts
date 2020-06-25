import { Action } from "./main";

export type Countdown = {
  countdown: number | null;
  interval: number | null;
};

const initState = {
  countdown: 0,
  interval: null,
};

export const CLEAR_COUNTDOWN = Symbol(),
  SET_COUNTDOWN = Symbol(),
  UPDATE_COUNTDOWN = Symbol(),
  LOWER_IT_BRUV = Symbol();

export default function CountdownReducer(
  state: Countdown = initState,
  { type, payload }: Action,
) {
  switch (type) {
    case UPDATE_COUNTDOWN:
      return { ...state, countdown: payload };
    case SET_COUNTDOWN:
      return payload;
    case CLEAR_COUNTDOWN:
      //@ts-ignore
      clearInterval(state.interval);
      return { ...initState };
    case LOWER_IT_BRUV:
      return { ...state, countdown: 3 };
    default:
      return state;
  }
}
