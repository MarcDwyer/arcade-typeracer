import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../enums";
import { setCountdown } from "../../actions/countdown_actions";

import TypingInterface from "../TypingInterface/typing_interface";

export default function SinglePlayer() {
  const dispatch = useDispatch();
  const [phase, textData] = useSelector((store: ReduxStore.State) => [
    store.status.phase,
    store.textData,
  ]);
  console.log(phase);
  return (
    <div className="single-player">
      {(() => {
        switch (phase) {
          case Phases.loaded:
            return (
              <button onClick={() => dispatch(setCountdown(8))}>
                Start
              </button>
            );
          case Phases.countdown:
            return <span>Get Ready!</span>;
          case Phases.complete:
            return <span>You have completed the race!</span>;
          case Phases.typing:
            return <TypingInterface textData={textData} />;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
}
