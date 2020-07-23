import React from "react";
import { observer } from "mobx-react";
import GameStore from "../../stores/gameStore";

import { TryAgain } from "../../styled-components/buttons";

import FinalResults from "../../components/Final_Results/final_results";

import "./completed_phase.scss";

type Props = {
  gameData: GameStore;
};

const CompletePhase = observer(({ gameData }: Props) => {
  return (
    <div className="completed-phase">
      <FinalResults stats={gameData.stats} />
      <span>You have completed the race!</span>
      <TryAgain
        onClick={() => {
          gameData.resetGame();
        }}
      >
        Try Again?
      </TryAgain>
    </div>
  );
});

export default CompletePhase;
