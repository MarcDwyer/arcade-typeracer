import { CHANGE_STATUS } from "../reducers/status_reducer";

export function setStatus(status: string) {
  return {
    type: CHANGE_STATUS,
    payload: status,
  };
}
