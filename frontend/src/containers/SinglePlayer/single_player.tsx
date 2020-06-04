import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../enums";
import { setTimer } from "../../actions/typing_actions";

export default function SinglePlayer() {
  const dispatch = useDispatch();
  const [status, isTimer] = useSelector((store: ReduxStore.State) => [
    store.typing.status,
    Boolean(store.typing.countdown),
  ]);

  return (
    <div className="single-player">
      {(() => {
        switch (status.phase) {
          case Phases.loaded:
            return (
              <button onClick={() => dispatch(setTimer(15, Phases.countdown))}>
                Start
              </button>
            );
          case Phases.prepare:
            if (isTimer) {
              return <span>Get Ready!</span>;
            }
            return;
          case Phases.complete:
            return <span>You have completed the race!</span>;
          case Phases.countdown:
            return <span>Get ready!</span>;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
}
