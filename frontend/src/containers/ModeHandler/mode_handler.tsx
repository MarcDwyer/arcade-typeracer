import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { isDev } from "../../util";

import SinglePlayer from "../SinglePlayer/single_player";
import MultiPlayer from "../MultiPlayer/multi_player";

import {
  GameDataDiv,
  ModeHandlerDiv,
  ModeDisplayDiv,
  CountDownDiv,
} from "../../styled-components/mode_handler_styles";

import { RouteModes, Phases } from "../../enums";

import { ReduxStore } from "../../reducers/main";
import { setTimer, hackTimer } from "../../actions/timer_actions";

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
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 57) {
        dispatch(hackTimer());
      }
    });
  }, []);

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

  const displayStats = phase === Phases.complete || phase === Phases.typing;

  if (!isDev()) {
    return <span>still working on module</span>;
  }

  return (
    <ModeHandlerDiv
      bgColor={phase !== Phases.typing ? "transparent" : undefined}
    >
      <div className="shared-data">
        {timer.countdown !== 0 && typeof timer.countdown === "number" && (
          <CountDownDiv
            margin={phase === Phases.countdown ? "auto" : undefined}
          >
            <span>{timer.countdown} seconds remaining</span>
          </CountDownDiv>
        )}
        {displayStats && (
          <GameDataDiv>
            <h3>Typing stats</h3>
            {textData.wpm !== 0 && <span>WPM: {textData.wpm}</span>}
            {textData.progress &&
              <span>Progress: {textData.progress}%</span>}
          </GameDataDiv>
        )}
      </div>
      <ModeDisplayDiv>
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
      </ModeDisplayDiv>
    </ModeHandlerDiv>
  );
}

export default ModeHandler;
