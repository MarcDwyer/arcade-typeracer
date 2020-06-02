import { Action } from "./main";

export type Statuses = "pending" | "start" | "waiting" | "loaded";

export type Mode = "single" | "multi";

export type StatusState = {
  currStatus: Statuses;
  mode: Mode | null;
};
export const Status = {
  pending: "pending",
  start: "start",
  waiting: "waiting",
  loaded: "loaded",
};

export const CHANGE_STATUS = Symbol();

export default function StatusReducer(
  state: StatusState = { currStatus: "waiting", mode: null },
  { type, payload }: Action
) {
  switch (type) {
    case CHANGE_STATUS:
      return payload;
    default:
      return state;
  }
}
