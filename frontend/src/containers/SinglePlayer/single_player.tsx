import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";

import { Phases, PayloadTypes } from "../../enums";

import TypingInterface from "../../components/TypingInterface/typing_interface";
import { setTimer } from "../../actions/timer_actions";

import { TryAgain, StandardBtn } from "../../styled-components/buttons";
import { CompletedMsg } from "../../styled-components/game_styles";
import { CHANGE_PHASE } from "../../reducers/status_reducer";
import { setPhasers } from "../../actions/status_actions";

import GameStore, { GameData } from "../../stores/gameStore";
import SocketStore from "../../stores/socketStore";

const SinglePlayer = observer(() => {
  // const dispatch = useDispatch();
  // const [phase, textData, ws, countdown] = useSelector((
  //   store: ReduxStore.State,
  // ) => [
  //   store.status.phase,
  //   store.textData,
  //   store.socket,
  //   store.timer.countdown,
  // ]);
  const gameStore = useContext(GameStore);
  const { socket } = useContext(SocketStore);
  const { phase, text } = gameStore.game;
  useEffect(() => {
    switch (phase) {
      case Phases.waiting:
        if (socket) {
          socket.send(
            JSON.stringify({ type: PayloadTypes.single_typing_text }),
          );
        }
    }
  }, [phase, socket]);

  useEffect(() => {
    if (phase === Phases.waiting && text) {
      console.log("changing");
      // dispatch({ type: CHANGE_PHASE, payload: Phases.loaded });
    }
  }, [phase, text]);
  return (
    <div className="single-player">
      {(() => {
        switch (phase) {
          case Phases.loaded:
            return (
              <StandardBtn
                colorType="default"
                onClick={() => gameStore.game.phase = Phases.countdown}
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
                <TryAgain
                  onClick={() => {
                    //reset game state here
                    gameStore.reset();
                  }}
                >
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
});

export default SinglePlayer;
