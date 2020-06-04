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
      selected,
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
    const newPhase =
      phase === Phases.countdown ? Phases.start : Phases.complete;
    console.log(phase, newPhase);
    dispatch({
      type: CHANGE_STATUS,
      payload: newPhase,
    });
  };
}
