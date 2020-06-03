import { ReduxStore } from "../reducers/main";
import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
  SET_TYPING,
  SET_COUNTDOWN,
} from "../reducers/typing_reducer";
import { Phases } from "../enums";
import { typeText } from "../typing_text";

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

/**
 *
 * @param time time should be in seconds, it is then converted to the futuretime in milliseconds
 * @param desiredPhase whether it be prepare
 * @returns in milliseconds
 */
type DesiredPhase = Phases.prepare | Phases.start;

export function setTimer(time: number, desiredPhase: DesiredPhase) {
  return {
    type: SET_COUNTDOWN,
    payload: time * 1000 + Date.now(),
  };
}

export function loadTyping(mode: string) {
  const selected = typeText.tutorial;
  return {
    type: SET_TYPING,
    payload: {
      selected,
      status: {
        mode,
        phase: Phases.loaded,
      },
    },
  };
}
