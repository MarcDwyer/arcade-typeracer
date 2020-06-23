import { useState, useEffect } from "react";
import { Countdown, PhaseTypes } from "./reducers/reducer_types";
import { Phases } from "./enums";
import { roundTenth } from "./util";

export const useWpm = (
  wordCount: number,
  phase: PhaseTypes,
  { duration, countdown }: Countdown
) => {
  const [wpm, setWpm] = useState<number | null>(null);

  useEffect(() => {
    if (phase === Phases.waiting) {
      setWpm(null);
      return;
    }
    if (!countdown || phase !== Phases.typing) {
      return;
    }
    const diff = duration - countdown;
    if (!diff) {
      setWpm(0);
      return;
    }
    const result = roundTenth((wordCount / diff) * 100);
    setWpm(result);
  }, [wordCount, countdown, phase]);
  return wpm;
};
