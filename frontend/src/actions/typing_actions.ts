import { ReduxStore } from "../reducers/main";
import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
  SET_TYPING,
  Phases,
} from "../reducers/typing_reducer";
import { typeText } from "../typing_text";
import { validRouteMode } from "../util";

export type GetState = () => ReduxStore.State;

export function handleTyping(char: string) {
  char = char[char.length - 1];
  return (dispatch: Dispatch, getState: GetState) => {
    const typing = getState().typing;
    if (typing.status.phase === Phases.complete) {
      return;
    }
    let textData = typing.textData;
    if (!textData) return;
    const curr = textData.text[typing.currIndex];
    if (char !== curr.char) {
      dispatch({ type: SET_ERROR, payload: "Incorrect character" });
      return;
    }
    textData.text[typing.currIndex].completed = true;
    const value = char === " " ? char : typing.value + char;
    const completed = textData.text.length - 1 === typing.currIndex;
    dispatch({
      type: INC_INDEX,
      payload: {
        ...typing,
        error: false,
        currIndex: completed ? typing.currIndex : typing.currIndex + 1,
        completed,
        value,
        textData,
      },
    });
  };
}

export function loadTyping(route: string) {
  const selected = typeText.tutorial;
  return {
    type: SET_TYPING,
    payload: {
      selected,
      status: {
        route,
        phase: Phases.loaded,
      },
    },
  };
}
