import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../enums";

import TypingInterface from "../../components/TypingInterface/typing_interface";
import { setTimer } from "../../actions/game_actions";
import { RESET_GAME } from "../../reducers/game_reducer";

import { TryAgain, StandardBtn } from "../../styled-components/buttons";
import { CompletedMsg } from "../../styled-components/game_styles";

export default function SinglePlayer() {
  const dispatch = useDispatch();
  const [phase, textData] = useSelector((store: ReduxStore.State) => [
    store.gameData.status.phase,
    store.gameData.textData,
  ]);
  return (
    <div className="single-player">
      {(() => {
        switch (phase) {
          case Phases.loaded:
            return (
              <StandardBtn
                colorType="default"
                onClick={() => {
                  dispatch(setTimer(8, Phases.countdown));
                }}
              >
                Ready?
              </StandardBtn>
            );
          case Phases.waiting:
            return <span>Fetching typing data...</span>;
          case Phases.countdown:
            return <span>Get Ready!</span>;
          case Phases.complete:
            return (
              <CompletedMsg>
                <span>You have completed the race!</span>
                <TryAgain onClick={() => dispatch({ type: RESET_GAME })}>
                  Try Again?
                </TryAgain>
              </CompletedMsg>
            );
          case Phases.typing:
            return <TypingInterface textData={textData} phase={phase} />;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
}
