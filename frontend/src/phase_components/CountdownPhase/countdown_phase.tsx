import React from "react";
import Timer from "../../components/Timer/timer";

import "./countdown_phase.scss";

type Props = {
  timer: number;
};

export default function CountdownPhase({ timer }: Props) {
  return (
    <div className="countdown-phase">
      <Timer timer={timer} />
      <span>Get Ready!</span>
    </div>
  );
}
