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

  console.log(isTimer);
  return (
    <div className="single-player">
      {(() => {
        console.log(status);
        switch (status.phase) {
          case Phases.loaded:
            return (
              <button onClick={() => dispatch(setTimer(15, Phases.prepare))}>
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
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
}
