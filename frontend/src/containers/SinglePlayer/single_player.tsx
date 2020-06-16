import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../enums";

import TypingInterface from "../../components/TypingInterface/typing_interface";
import { setTimer } from "../../actions/game_actions";
import { RESET_GAME } from "../../reducers/game_reducer";

import { StandardBtn } from "../../styled-components/buttons";

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
                colorType="standard"
                onClick={() => {
                  dispatch(setTimer(8, Phases.countdown));
                }}
              >
                Start
              </StandardBtn>
            );
          case Phases.waiting:
            return <span>Fetching typing data...</span>;
          case Phases.countdown:
            return <span>Get Ready!</span>;
          case Phases.complete:
            return (
              <div className="completed">
                <span>You have completed the race!</span>
                <button onClick={() => dispatch({ type: RESET_GAME })}>
                  Try again?
                </button>
              </div>
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
