import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";

import { RouteModes, Phases } from "../../enums";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { setTimer, skipTimer } from "../../actions/game_actions";

import "./mode_handler.scss";
import { Theme } from "../../themes/theme_colors.";
import { useWpm } from "../../hooks";
import { FINALIZE_TYPING } from "../../reducers/game_reducer";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const [phase, timer, textData] = useSelector((store: ReduxStore.State) => [
    store.gameData.status.phase,
    store.gameData.timer,
    store.gameData.textData,
  ]);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 57) {
        dispatch(skipTimer());
      }
    });
  }, []);
  const wpm = useWpm(textData.wordCount, phase, timer);
  console.log(wpm);
  useEffect(() => {
    if (textData.duration && phase === Phases.typing && !timer.countdown) {
      dispatch(setTimer(textData.duration, Phases.typing));
    }
  }, [timer, phase, textData.duration]);

  useEffect(() => {
    if (phase === Phases.complete) {
      console.log("finalizing...");
      dispatch({
        type: FINALIZE_TYPING,
        payload: wpm,
      });
    }
  }, [phase]);

  return (
    <div
      className="mode-handler"
      style={{
        backgroundColor:
          phase === Phases.typing ? Theme.shadeColor : "transparent",
      }}
    >
      <div className="shared-data">
        {timer.countdown && <span>{timer.countdown} seconds</span>}
        {typeof wpm === "number" && <span>{wpm} wpm</span>}
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
