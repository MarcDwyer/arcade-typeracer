import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";

import { RouteModes, Phases } from "../../enums";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { setTimer } from "../../actions/timer_actions";

import "./mode_handler.scss";
import { Theme } from "../../themes/theme_colors.";
import { FINALIZE_TYPING } from "../../reducers/text_reducer";
import { CHANGE_PHASE } from "../../reducers/status_reducer";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const [phase, timer, textData] = useSelector((store: ReduxStore.State) => [
    store.status.phase,
    store.timer,
    store.textData,
  ]);

  useEffect(() => {
    if (textData.duration && phase === Phases.typing && !timer.countdown) {
      dispatch(
        setTimer(
          textData.duration,
          Phases.complete,
        ),
      );
    }
  }, [timer, phase, textData.duration]);

  useEffect(() => {
    if (phase === Phases.complete) {
      console.log("finalizing...");
      dispatch({
        type: FINALIZE_TYPING,
        payload: 122,
      });
    }
  }, [phase]);

  return (
    <div
      className="mode-handler"
      style={{
        backgroundColor: phase === Phases.typing
          ? Theme.shadeColor
          : "transparent",
      }}
    >
      <div className="shared-data">
        {timer.countdown !== null && timer.countdown !== 0 &&
          <span>{timer.countdown} seconds</span>}
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
