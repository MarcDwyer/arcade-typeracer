import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";
// import Results from "../../components/Results/results";
// import Countdown from "react-countdown";

import { RouteModes, Phases } from "../../enums";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTyping,
} from "../../actions/typing_actions";
import { ReduxStore } from "../../reducers/main";
import {
  setCountdown,
  setDuration,
} from "../../actions/countdown_actions";
import { changePhase } from "../../actions/status_actions";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const [timer, phase, textData] = useSelector(
    (
      store: ReduxStore.State,
    ) => [store.timer, store.status.phase, store.textData],
  );

  const typingTime = 20,
    coutnDownTime = 8;

  useEffect(() => {
    console.log(phase);
    switch (phase) {
      case Phases.waiting:
        dispatch(loadTyping());
        break;
      case Phases.countdown:
        dispatch(setDuration(coutnDownTime));
      case Phases.complete:
        break;
      case Phases.typing:
        dispatch(setDuration(typingTime));
    }
  }, [phase]);

  useEffect(() => {
    if (phase === Phases.waiting && textData.text) {
      dispatch(changePhase(Phases.loaded));
    }
  }, [phase, textData.text]);
  useEffect(() => {
    if (timer && timer.duration && !timer.countdown) {
      dispatch(setCountdown());
    }
  }, [timer]);
  console.log(textData);
  return (
    <div className="mode-handler">
      {timer && timer.countdown && (
        <span>{timer.countdown}</span>
      )}
      {textData.wpm && (
        <span>{textData.wpm} wpm</span>
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
