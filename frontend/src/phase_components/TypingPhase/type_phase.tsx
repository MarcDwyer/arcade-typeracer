import React from "react";
import { observer } from "mobx-react";

import TypingInterface from "../../components/TypingInterface/typing_interface";
import Timer from "../../components/Timer/timer";
import StatsUi from "../../components/Stats_UI/stats_ui";

import GameStore from "../../stores/gameStore";

type Props = {
  gameData: GameStore;
  timer: number;
};

const TypingPhase = observer(({ gameData, timer }: Props) => {
  return (
    <div className="typing-phase">
      <StatsUi stats={gameData.stats} />
      <Timer timer={timer} />
      {gameData.text && (
        <TypingInterface
          handleTyping={gameData.handleTyping}
          value={gameData.value}
          error={gameData.error}
          text={gameData.text}
        />
      )}
    </div>
  );
});

export default TypingPhase;
