import { useEffect, useState } from "react";
import { getTime, TimeResults } from "./util";

export const useTimer = (futureTime: number) => {
  const [timer, setTimer] = useState<TimeResults | null>(null);

  useEffect(() => {
    let interval: number;
    setTimer(getTime(futureTime));
    //@ts-ignore
    interval = setInterval(() => setTimer(getTime(futureTime)), 1000);

    return function () {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [futureTime]);

  return timer;
};
