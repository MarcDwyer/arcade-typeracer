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
  const { gameData, socket, countdown } = store;

  useEffect(() => {
    if (!gameData.text && socket) {
      socket.send(
        JSON.stringify({
          type: PayloadTypes.single_typing_text,
        })
      );
    }
  }, [gameData.text, socket]);

  return (
    <div className="single-player">
      {(() => {
        switch (store.phase) {
          case Phases.loaded:
            return (
              <StandardBtn
                colorType="default"
                onClick={() => (store.phase = Phases.countdown)}
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
                    store.resetGame();
                  }}
                >
                  Try Again?
                </TryAgain>
              </CompletedMsg>
            );
          case Phases.typing:
            return <TypingPhase timer={countdown.timer} gameData={gameData} />;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
});

export default SinglePlayer;
