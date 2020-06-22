import { Action } from "./main";

export type ErrorState = null | string;

export const SET_APP_ERROR = Symbol();

export default function ErrorReducer(state = null, { payload, type }: Action) {
  switch (type) {
    case SET_APP_ERROR:
      console.log(`set error ${payload}`);
      return payload;
    default:
      return state;
  }
}
