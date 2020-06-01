import { ReduxStore } from "../reducers/main";
import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
  SET_TIMER,
  COMPLETE,
} from "../reducers/typing_reducer";
import { getTime } from "../util";

type GetState = () => ReduxStore.State;

export function handleTyping(char: string) {
  char = char[char.length - 1];
  return (dispatch: Dispatch, getState: GetState) => {
    const typing = getState().typing;
    if (typing.completed) {
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

export const setTimer = (time: number) => (dispatch: Dispatch) => {
  time = time * 1000;
  const futureTime = Date.now() + time;
  let timer: undefined | number;
  const initTimer = () => {
    const timeRes = getTime(futureTime);
    if (timeRes.join("") === "000") {
      dispatch({
        type: COMPLETE,
      });
      clearInterval(timer);
      return;
    }
    dispatch({
      type: SET_TIMER,
      payload: timeRes,
    });
  };
  initTimer();
  timer = setInterval(initTimer, 1000);
};
