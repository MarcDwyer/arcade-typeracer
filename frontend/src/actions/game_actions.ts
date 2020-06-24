import { Dispatch } from "redux";
import {
  INC_INDEX,
  SET_ERROR,
  SET_COUNTDOWN,
  UPDATE_COUNTDOWN,
  CLEAR_COUNTDOWN,
  CHANGE_PHASE,
} from "../reducers/game_reducer";
import { PhaseTypes, Countdown } from "../reducers/reducer_types";

import { GetState } from "./action_types";
import { Phases } from "../enums";

export function handleTyping(char: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const { textData } = getState().gameData;
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

export function setTimer(duration: number, phase: PhaseTypes) {
  return (dispatch: Dispatch, getState: GetState) => {
    const initInterval = () => {
      const timer = getState().gameData.timer;
      if (!timer.countdown) return;
      const future = timer.countdown - 1;
      if (future) {
        dispatch({
          type: UPDATE_COUNTDOWN,
          payload: future,
        });
      } else {
        if (phase === Phases.countdown) {
          dispatch({
            type: CLEAR_COUNTDOWN,
          });
        } else {
          dispatch({
            type: CHANGE_PHASE,
            payload: Phases.complete,
          });
        }
      }
    };
    const timer: Countdown = {
      duration,
      countdown: duration,
      interval: setInterval(initInterval, 1000),
    };

    dispatch({
      type: SET_COUNTDOWN,
      payload: {
        timer,
        phase,
      },
    });
  };
}

export function skipTimer() {
  return {
    type: UPDATE_COUNTDOWN,
    payload: 3,
  };
}
