import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTime } from "../../actions/timer_actions";

import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../reducers/typing_reducer";

export default function SinglePlayer() {
  const dispatch = useDispatch();
  const [tData, timer] = useSelector((
    store: ReduxStore.State,
  ) => [store.typing, store.timer]);

  return (
    <div className="single-player">
      {(() => {
        const { status } = tData;
        console.log(status);
        switch (status.phase) {
          case Phases.loaded:
            return <button onClick={() => dispatch(setTime(15))}>
              Start
            </button>;
          case Phases.complete:
            return <span>You have completed the race!</span>;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
}
