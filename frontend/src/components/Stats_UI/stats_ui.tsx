import React from "react";
import { Statistics } from "../../stores/gameStore";

import "./stats_ui.scss";

type Props = {
  stats: Statistics;
};

const Stats = (p: Props) => {
  const { wpm, progress } = p.stats;
  return <div className="stats">
    <div className="stat-content">
      <span className="header">Stats</span>
      <span>wpm: {wpm}</span>
      <span>progress: {progress}%</span>
    </div>
  </div>;
};

export default Stats;
