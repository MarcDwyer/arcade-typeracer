import { Action } from "./main";

export const SET_COUNTDOWN = Symbol(),
  CLEAR_COUNTDOWN = Symbol();

export type CountDownState = number | null;

export default function CountDownReducer(
  state: CountDownState = null,
  { type, payload }: Action,
) {
  switch (type) {
    case SET_COUNTDOWN:
      return payload as CountDownState;
    default:
      return state;
  }
}
