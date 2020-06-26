import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
  SET_WPM_PROGRESS,
} from "../reducers/text_reducer";

import { GetState } from "./action_types";
import { Phases } from "../enums";
import { CHANGE_PHASE } from "../reducers/status_reducer";
import { calcWpm, getProgress } from "../util";

export function handleTyping(char: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { textData, timer } = getState();
    const { text, currIndex, value } = textData;

    if (!text || !textData.duration || !timer.countdown) return;
    const curr = text[currIndex];
    if (char !== curr.char) {
      dispatch({ type: SET_ERROR, payload: "Incorrect character" });
      return;
    }
    text[currIndex].completed = true;
    const completed = text.length - 1 === currIndex;
    const newIndex = completed ? currIndex : currIndex + 1;

    const newValue = char === " " ? "" : value + char;
    const newWordCount = Math.floor((newIndex + 1) / 5);

    dispatch({
      type: INC_INDEX,
      payload: {
        error: false,
        currIndex: newIndex,
        wordCount: newWordCount,
        value: newValue,
      },
    });
    if (completed) {
      dispatch({
        type: CHANGE_PHASE,
        payload: Phases.complete,
      });
    }
  };
}

export function setWpmProgress() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { timer, textData } = getState();
    if (!timer.countdown || !textData.duration || !textData.text) return;
    const diff = textData.duration - timer.countdown;
    dispatch({
      type: SET_WPM_PROGRESS,
      payload: {
        wpm: calcWpm(textData.currIndex + 1, diff),
        progress: getProgress(textData.text.length, textData.currIndex),
      },
    });
  };
}
