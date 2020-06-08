import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";
import Results from "../../components/Results/results";
import Countdown from "react-countdown";

import { RouteModes, Phases } from "../../enums";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTyping,
} from "../../actions/typing_actions";
import { ReduxStore } from "../../reducers/main";
import { setCountdown, clearCountdown } from "../../actions/countdown_actions";
import { changePhase } from "../../actions/status_actions";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const [countdown, phase, textData] = useSelector(
    (
      store: ReduxStore.State,
    ) => [store.countdown, store.status.phase, store.textData],
  );

  const typingTime = 20;

  useEffect(() => {
    switch (phase) {
      case Phases.waiting:
        dispatch(loadTyping());
        break;
      case Phases.complete:
        break;
      case Phases.typing:
        dispatch(setCountdown(typingTime));
    }
  }, [phase]);

  useEffect(() => {
    if (phase === Phases.waiting && textData.text) {
      dispatch(changePhase(Phases.loaded));
    }
  }, [phase, textData.text]);
  // TODO
  // Might need to create own timer to monitor time
  return (
    <div className="mode-handler">
      {countdown && (
        <Countdown
          date={countdown}
          onComplete={(t) => {
            console.log(t);
            dispatch(clearCountdown());
            const newPhase = phase === Phases.countdown
              ? Phases.typing
              : Phases.complete;
            dispatch(changePhase(newPhase));
          }}
        />
      )}
      {phase === Phases.complete && (
        <Results
          wordCount={textData.wordCount}
          seconds={textData.completedIn}
        />
      )}
      {(() => {
        switch (mode) {
          case RouteModes.single:
            return <SinglePlayer />;
          case RouteModes.multi:
            return <span>Havent created this module yet...</span>;
          default:
            return <span>Path not found</span>;
        }
      })()}
    </div>
  );
}

export default ModeHandler;
