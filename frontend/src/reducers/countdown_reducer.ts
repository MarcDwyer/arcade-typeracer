import { Action } from "./main";

export const SET_COUNTDOWN = Symbol(),
  CLEAR_COUNTDOWN = Symbol();

export type CountdownState = number | null;

export default function CountDownReducer(
  state: CountdownState = null,
  { type, payload }: Action,
) {
  switch (type) {
    case SET_COUNTDOWN:
      return payload;
    case CLEAR_COUNTDOWN:
      return null;
    default:
      return state;
  }
}
