import { useEffect, useState } from "react";
import { getTime, TimeResults } from "./util";

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
