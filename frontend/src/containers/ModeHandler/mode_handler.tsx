import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";
// import Results from "../../components/Results/results";
// import Countdown from "react-countdown";

import { RouteModes, Phases, PayloadTypes } from "../../enums";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { finalizeTyping, setTimer } from "../../actions/game_actions";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const [phase, timer, ws, wpm] = useSelector((
    store: ReduxStore.State,
  ) => [
    store.gameData.status.phase,
    store.gameData.timer,
    store.socket,
    store.gameData.textData.wpm,
  ]);

  useEffect(() => {
    switch (phase) {
      case Phases.waiting:
        if (ws) {
          ws.send(JSON.stringify({ type: PayloadTypes.typing_text }));
        }
    }
  }, [phase, ws]);
  useEffect(() => {
    if (phase === Phases.typing && !timer.countdown) {
      dispatch(setTimer(22, Phases.typing));
    }
  }, [timer, phase]);
  useEffect(() => {
    if (phase === Phases.complete && !wpm) {
      dispatch(finalizeTyping());
    }
  }, [phase, wpm]);

  const isWpm = typeof wpm === "number";

  return (
    <div className="mode-handler">
      {timer.countdown && (
        <span>{timer.countdown}</span>
      )}
      {isWpm && <span>{wpm} wpm</span>}
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
