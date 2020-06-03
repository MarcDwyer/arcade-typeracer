import { TimeResults } from "../util";
import { Action } from "./main";

export type TimeState = TimeResults | null;

export const SET_TIMER = Symbol();

export function TimerReducer(
  state: TimeState = null,
  { type, payload }: Action,
) {
  switch (type) {
    case SET_TIMER:
      return payload as TimeResults;
    default:
      return state;
  }
}

export default TimerReducer;
