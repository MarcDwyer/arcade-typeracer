import React from "react";
import { Statistics } from "../../stores/gameStore";

import "./final_results.scss";
import { Theme } from "../../themes/theme_colors.";

type Props = {
  stats: Statistics;
};

function FinalResults({ stats }: Props) {
  return (
    <div className="final-results" style={{ backgroundColor: Theme.bgColor }}>
      <div className="inner-final">
        <span className="headline">Final stats</span>
        <div className="stat-info">
          <span>wpm: {stats.wpm}</span>
        </div>
      </div>
    </div>
  );
}

export default FinalResults;
