import { ReduxStore } from "../reducers/main";

/**
 * Use this for second parameter for thunk
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
