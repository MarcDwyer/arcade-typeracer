import { useEffect, useState } from "react";
import { getTime, TimeResults } from "./util";
import { Dispatch } from "redux";
import { PhaseTypes } from "./reducers/status_reducer";
import { loadTyping } from "./actions/typing_actions";
import { setCountdown } from "./actions/countdown_actions";
import { Phases } from "./enums";

export const useTimer = (time: number | null) => {
  const [timer, setTimer] = useState<TimeResults | null>(null);
  useEffect(() => {
    let interval: number | undefined;
    if (time) {
      const future = Date.now() + time;
      interval = setInterval(() => {
        if (future) {
          setTimer(getTime(future));
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }

    return function () {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [time]);

  return timer;
};
