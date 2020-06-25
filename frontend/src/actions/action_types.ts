import { ReduxStore } from "../reducers/main";

/**
 * GetState is the second paramter for redux-thunk
 */
export type GetState = () => ReduxStore.State;

export type WsPayload = {
  type: string;
  payload: {
    name: string;
    text: string;
    time: number;
  };
};
