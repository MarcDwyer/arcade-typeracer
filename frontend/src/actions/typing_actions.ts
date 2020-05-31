import { ReduxStore } from "../reducers/main";
import { Dispatch } from "redux";
import { INC_INDEX, SET_ERROR } from "../reducers/typing_reducer";

type GetState = () => ReduxStore.State;

// if (!state.text) return state;
// const text = [...state.text];
// text[state.index].completed = true;
// const value = payload === " " ? payload : state.value + payload;
// const completed = state.text.length - 1 === state.index ? true : false;
// return {
//   ...state,
//   error: false,
//   index: completed ? state.index : state.index + 1,
//   completed,
//   value,
//   text,
// };

export function handleTyping(char: string) {
  char = char[char.length - 1];
  return (dispatch: Dispatch, getState: GetState) => {
    const typing = getState().typing;
    if (!typing.typing_text) return;
    const typing_text = [...typing.typing_text];
    const curr = typing_text[typing.currIndex];
    if (typing.completed) {
      return;
    }
    if (char !== curr.char) {
      dispatch({ type: SET_ERROR, payload: "Incorrect character" });
      return;
    }
    typing_text[typing.currIndex].completed = true;
    const value = char === " " ? char : typing.value + char;
    const completed = typing.typing_text.length - 1 === typing.currIndex;
    dispatch({
      type: INC_INDEX,
      payload: {
        ...typing,
        error: false,
        currIndex: completed ? typing.currIndex : typing.currIndex + 1,
        completed,
        value,
        typing_text,
      },
    });
  };
}
