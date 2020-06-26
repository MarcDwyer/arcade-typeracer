import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";
import MultiPlayer from "../MultiPlayer/multi_player";

import { RouteModes, Phases } from "../../enums";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { setTimer } from "../../actions/timer_actions";

import { Theme } from "../../themes/theme_colors.";
import { setWpmProgress } from "../../actions/typing_actions";
import { CLEAR_COUNTDOWN } from "../../reducers/timer_reducer";

import "./mode_handler.scss";

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
      dispatch({ type: CLEAR_COUNTDOWN });
    }
  }, [phase]);

  useEffect(() => {
    if (timer.countdown && phase === Phases.typing) {
      dispatch(setWpmProgress());
    }
  }, [timer.countdown, phase]);

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
        {textData.wpm !== 0 && <span>{textData.wpm} wpm</span>}
        {textData.progress !== 0 && <span>{textData.progress}%</span>}
      </div>
      <div className="mode-display">
        {(() => {
          switch (mode) {
            case RouteModes.single:
              return <SinglePlayer />;
            case RouteModes.multi:
              return <MultiPlayer />;
            default:
              return <span>Path not found</span>;
          }
        })()}
      </div>
    </div>
  );
}

export default ModeHandler;
