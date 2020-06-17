import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";

import { RouteModes, Phases, PayloadTypes } from "../../enums";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { finalizeTyping, setTimer } from "../../actions/game_actions";

import "./mode_handler.scss";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const [
    phase,
    timer,
    ws,
    textData,
  ] = useSelector((store: ReduxStore.State) => [
    store.gameData.status.phase,
    store.gameData.timer,
    store.socket,
    store.gameData.textData,
  ]);
  const { wpm, wordCount } = textData;
  useEffect(() => {
    switch (phase) {
      case Phases.waiting:
        if (ws) {
          ws.send(JSON.stringify({ type: PayloadTypes.typing_text }));
        }
    }
  }, [phase, ws]);
  useEffect(() => {
    if (textData.duration && phase === Phases.typing && !timer.countdown) {
      dispatch(setTimer(textData.duration, Phases.typing));
    }
  }, [timer, phase, textData.duration]);
  useEffect(() => {
    if (phase === Phases.complete && !wpm) {
      dispatch(finalizeTyping());
    }
  }, [phase, wpm]);

  const isWpm = typeof wpm === "number";
  return (
    <div className="mode-handler">
      <div className="shared-data">
        {timer.countdown && <span>{timer.countdown} seconds</span>}
        {wordCount !== 0 && <span>{wordCount} words typed</span>}
        {isWpm && <span>{wpm} wpm</span>}
      </div>
      <div className="mode-display">
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
    </div>
  );
}

export default ModeHandler;
