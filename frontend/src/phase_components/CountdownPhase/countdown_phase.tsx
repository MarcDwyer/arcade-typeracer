import React from "react";
import Timer from "../../components/Timer/timer";
import { observer } from "mobx-react";

import "./countdown_phase.scss";

type Props = {
  timer: number;
};
const CountdownPhase = observer(({ timer }: Props) => {
  return (
    <div className="countdown-phase">
      <Timer timer={timer} />
      <span>Get Ready!</span>
    </div>
  );
});

export default CountdownPhase;
