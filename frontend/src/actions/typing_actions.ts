import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
  SET_TYPING,
  FINALIZE_TYPING,
} from "../reducers/typing_reducer";
import { typeText } from "../typing_text";
import { transformChar } from "../util";
import { CHANGE_PHASE } from "../reducers/status_reducer";
import { Phases } from "../enums";
import { GetState } from "./action_types";

export function handleTyping(char: string) {
  char = char[char.length - 1];
  return (dispatch: Dispatch, getState: GetState) => {
    const { text, currIndex, wordCount, value } = getState().textData;
    const timer = getState().timer;
    if (!text) return;

    const curr = text[currIndex];
    if (char !== curr.char) {
      dispatch({ type: SET_ERROR, payload: "Incorrect character" });
      return;
    }
    text[currIndex].completed = true;
    const newValue = char === " " ? char : value + char;
    const completed = text.length - 1 === currIndex;

    const getWordCount = () => {
      if (char === " " || completed) {
        if (!wordCount) {
          return 1;
        } else {
          return wordCount + 1;
        }
      } else {
        return wordCount;
      }
    };

    if (completed) {
      dispatch({
        type: CHANGE_PHASE,
        payload: Phases.complete,
      });
    }
    dispatch({
      type: INC_INDEX,
      payload: {
        ...timer,
        error: false,
        currIndex: completed ? currIndex : currIndex + 1,
        wordCount: getWordCount(),
        value: newValue,
      },
    });
  };
}
export function finalizeTyping() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { wordCount } = getState().textData;
    const { duration, countdown } = getState().timer;

    const wpm = () => {
      if (!countdown) return 1337;
      const timeTook = duration - countdown;
      return (wordCount / timeTook) * 100;
    };
    dispatch({
      type: FINALIZE_TYPING,
      payload: wpm(),
    });
  };
}

// This will most likely be async at some point

export function loadTyping() {
  const selected = typeText.tutorial;
  return {
    type: SET_TYPING,
    payload: transformChar(selected),
  };
}
