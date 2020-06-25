import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
} from "../reducers/text_reducer";

import { GetState } from "./action_types";
import { Phases } from "../enums";
import { CHANGE_PHASE } from "../reducers/status_reducer";

export function handleTyping(char: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { textData } = getState();
    const { text, currIndex, value } = textData;

    if (!text) return;
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
