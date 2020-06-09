import { ReduxStore } from "../reducers/main";

/**
 * Use this for second parameter for thunk
 */
export type GetState = () => ReduxStore.State;
