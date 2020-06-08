import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../enums";

import TypingInterface from "../../components/TypingInterface/typing_interface";
import { changePhase } from "../../actions/status_actions";

export default function SinglePlayer() {
  const dispatch = useDispatch();
  const [phase, textData] = useSelector((store: ReduxStore.State) => [
    store.status.phase,
    store.textData,
  ]);
  return (
    <div className="single-player">
      {(() => {
        switch (phase) {
          case Phases.loaded:
            return (
              <button
                onClick={() => {
                  dispatch(changePhase(Phases.countdown));
                }}
              >
                Start
              </button>
            );
          case Phases.waiting:
            return <span>Fetching typing data...</span>;
          case Phases.countdown:
            return <span>Get Ready!</span>;
          case Phases.complete:
            return <span>You have completed the race!</span>;
          case Phases.typing:
            return <TypingInterface textData={textData} phase={phase} />;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
}
