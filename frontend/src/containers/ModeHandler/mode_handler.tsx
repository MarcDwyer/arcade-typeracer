import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";
import Countdown from "react-countdown";

import { RouteModes, Phases } from "../../enums";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTyping,
  handleCountEnd,
  setTimer,
} from "../../actions/typing_actions";
import { validRouteMode } from "../../util";
import { ReduxStore } from "../../reducers/main";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const [countdown, phase] = useSelector(
    (
      store: ReduxStore.State,
    ) => [store.typing.countdown, store.typing.status.phase],
  );

  useEffect(() => {
    if (!validRouteMode(mode)) return;
    dispatch(loadTyping(mode));
  }, []);

  useEffect(() => {
    console.log(phase);
    switch (phase) {
      case Phases.typing:
        dispatch(setTimer(120, Phases.typing));
    }
  }, [phase]);

  console.log(countdown);
  return (
    <div className="mode-handler">
      {countdown && (
        <Countdown
          date={countdown}
          onComplete={() => dispatch(handleCountEnd())}
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
