import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../enums";
import { setTimer } from "../../actions/typing_actions";

import TypingInterface from "../TypingInterface/typing_interface";

export default function SinglePlayer() {
  const dispatch = useDispatch();
  const [typing] = useSelector((store: ReduxStore.State) => [
    store.typing,
  ]);
  const { status } = typing;
  console.log(status.phase);
  return (
    <div className="single-player">
      {(() => {
        switch (status.phase) {
          case Phases.loaded:
            return (
              <button onClick={() => dispatch(setTimer(8, Phases.countdown))}>
                Start
              </button>
            );
          case Phases.countdown:
            return <span>Get Ready!</span>;
          case Phases.complete:
            return <span>You have completed the race!</span>;
          case Phases.typing:
            return <TypingInterface textData={typing.textData} />;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
}
