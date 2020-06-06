import { ReduxStore } from "../reducers/main";
import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
  SET_TYPING,
} from "../reducers/typing_reducer";
import { typeText } from "../typing_text";
import { transformChar } from "../util";

export type GetState = () => ReduxStore.State;

export function handleTyping(char: string) {
  char = char[char.length - 1];
  return (dispatch: Dispatch, getState: GetState) => {
    const textData = getState().textData;
    if (!textData.text) {
      return;
    }
    const curr = textData.text[textData.currIndex];
    if (char !== curr.char) {
      dispatch({ type: SET_ERROR, payload: "Incorrect character" });
      return;
    }
    textData.text[textData.currIndex].completed = true;
    const value = char === " " ? char : textData.value + char;
    const completed = textData.text.length - 1 === textData.currIndex;
    console.log(completed);
    dispatch({
      type: INC_INDEX,
      payload: {
        error: false,
        currIndex: completed ? textData.currIndex : textData.currIndex + 1,
        wordCount: char === " " ? textData.wordCount + 1 : textData.wordCount,
        value,
        completed,
      },
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
