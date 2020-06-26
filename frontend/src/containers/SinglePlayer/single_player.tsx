import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStore } from "../../reducers/main";
import { Phases, PayloadTypes } from "../../enums";

import TypingInterface from "../../components/TypingInterface/typing_interface";
import { setTimer } from "../../actions/timer_actions";
import { RESET_GAME } from "../../reducers/text_reducer";

import { TryAgain, StandardBtn } from "../../styled-components/buttons";
import { CompletedMsg } from "../../styled-components/game_styles";
import { CHANGE_PHASE } from "../../reducers/status_reducer";

export default function SinglePlayer() {
  const dispatch = useDispatch();
  const [phase, textData, ws, countdown] = useSelector((
    store: ReduxStore.State,
  ) => [
    store.status.phase,
    store.textData,
    store.socket,
    store.timer.countdown,
  ]);
  useEffect(() => {
    switch (phase) {
      case Phases.waiting:
        if (ws) {
          ws.send(JSON.stringify({ type: PayloadTypes.single_typing_text }));
        }
    }
  }, [phase, ws]);

  useEffect(() => {
    if (phase === Phases.waiting && textData.text) {
      console.log("changing");
      dispatch({ type: CHANGE_PHASE, payload: Phases.loaded });
    }
  }, [phase, textData.text]);

  useEffect(() => {
    if (phase === Phases.countdown && !countdown) {
      dispatch(
        setTimer(
          8,
          Phases.typing,
        ),
      );
    }
  }, [phase, countdown]);
  return (
    <div className="single-player">
      {(() => {
        switch (phase) {
          case Phases.loaded:
            return (
              <StandardBtn
                colorType="default"
                onClick={() => {
                  dispatch({ type: CHANGE_PHASE, payload: Phases.countdown });
                }}
              >
                Ready?
              </StandardBtn>
            );
          case Phases.waiting:
            return <span>Fetching typing data...</span>;
          case Phases.countdown:
            return <span>Get Ready!</span>;
          case Phases.complete:
            return (
              <CompletedMsg>
                <span>You have completed the race!</span>
                <TryAgain onClick={() => dispatch({ type: RESET_GAME })}>
                  Try Again?
                </TryAgain>
              </CompletedMsg>
            );
          case Phases.typing:
            return <TypingInterface textData={textData} phase={phase} />;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
}
