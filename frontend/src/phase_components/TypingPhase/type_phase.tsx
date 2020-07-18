import React from "react";

import TypingInterface from "../../components/TypingInterface/typing_interface";
import Timer from "../../components/Timer/timer";

import { GameData } from "../../stores/gameStore";

type Props = {
  gameData: GameData;
  timer: number;
};

export default function TypingPhase({ gameData, timer }: Props) {
  return (
    <div className="typing-phase">
      <Timer timer={timer} />
      <TypingInterface gameData={gameData} />
    </div>
  );
}
