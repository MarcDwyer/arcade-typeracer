import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";

import { Phases, PayloadTypes } from "../../enums";

import CountdownPhase from "../../phase_components/CountdownPhase/countdown_phase";
import TypingPhase from "../../phase_components/TypingPhase/type_phase";

import { TryAgain, StandardBtn } from "../../styled-components/buttons";
import { CompletedMsg } from "../../styled-components/game_styles";

import Store from "../../stores/main";

const SinglePlayer = observer(() => {
  const store = useContext(Store);
  const { phase, socket, gameData, countdown } = store;
  const { game } = gameData;

  useEffect(() => {
    switch (phase) {
      case Phases.waiting:
        if (socket && !game.text) {
          socket.send(
            JSON.stringify({ type: PayloadTypes.single_typing_text }),
          );
        }
    }
  }, [phase, socket, game.text]);

  useEffect(() => {
    if (phase === Phases.waiting && game.text) {
      console.log("changing");
      // dispatch({ type: CHANGE_PHASE, payload: Phases.loaded });
    }
  }, [phase, game.text]);

  return (
    <div className="single-player">
      {(() => {
        switch (phase) {
          case Phases.loaded:
            return (
              <StandardBtn
                colorType="default"
                onClick={() => store.phase = Phases.countdown}
              >
                Ready?
              </StandardBtn>
            );
          case Phases.waiting:
            return <span>Fetching typing data...</span>;
          case Phases.countdown:
            return <CountdownPhase timer={countdown.timer} />;
          case Phases.complete:
            return (
              <CompletedMsg>
                <span>You have completed the race!</span>
                <TryAgain
                  onClick={() => {
                    store.gameData.reset();
                  }}
                >
                  Try Again?
                </TryAgain>
              </CompletedMsg>
            );
          case Phases.typing:
            return <TypingPhase gameData={game} timer={countdown.timer} />;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
});

export default SinglePlayer;
