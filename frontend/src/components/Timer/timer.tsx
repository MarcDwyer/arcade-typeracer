import React from "react";
import { TimerDiv } from "./timer_styles";

type Props = {
  timer: number;
};

function Timer({ timer }: Props) {
  return (
    <TimerDiv>
      <span>{timer} seconds</span>
    </TimerDiv>
  );
}

export default Timer;
