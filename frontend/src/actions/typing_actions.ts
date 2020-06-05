import { ReduxStore } from "../reducers/main";
import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
  SET_TYPING,
  SET_COUNTDOWN,
  CHANGE_STATUS,
  PhaseTypes,
} from "../reducers/typing_reducer";
import { Phases } from "../enums";
import { typeText } from "../typing_text";
import { transformChar } from "../util";

export type GetState = () => ReduxStore.State;

export function handleTyping(char: string) {
  char = char[char.length - 1];
  return (dispatch: Dispatch, getState: GetState) => {
    const typing = getState().typing;
    const { textData, status } = typing;
    if (status.phase === Phases.complete) {
      return;
    }
    if (!textData.text) return;
    const curr = textData.text[textData.currIndex];
    console.log(curr, char);
    if (char !== curr.char) {
      console.log("error");
      dispatch({ type: SET_ERROR, payload: "Incorrect character" });
      return;
    }
    textData.text[textData.currIndex].completed = true;
    const value = char === " " ? char : textData.value + char;
    const completed = textData.text.length - 1 === textData.currIndex;
    dispatch({
      type: INC_INDEX,
      payload: {
        error: false,
        textData: {
          ...textData,
          currIndex: completed ? textData.currIndex : textData.currIndex + 1,
          value,
          completed,
        },
      },
    });
  };
}

export function setTimer(time: number, phase: PhaseTypes) {
  return {
    type: SET_COUNTDOWN,
    payload: {
      countdown: time * 1000 + Date.now(),
      phase,
    },
  };
}

export function loadTyping(mode: string) {
  const selected = typeText.tutorial;
  return {
    type: SET_TYPING,
    payload: {
      text: transformChar(selected),
      status: {
        mode,
        phase: Phases.loaded,
      },
    },
  };
}

export function handleCountEnd() {
  return (dispatch: Dispatch, getState: GetState) => {
    const phase = getState().typing.status.phase;
    const newPhase = phase === Phases.countdown
      ? Phases.typing
      : Phases.complete;
    dispatch({
      type: CHANGE_STATUS,
      payload: newPhase,
    });
  };
}
