import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";

import { Phases, PayloadTypes } from "../../enums";

import TypingInterface from "../../components/TypingInterface/typing_interface";

import { TryAgain, StandardBtn } from "../../styled-components/buttons";
import { CompletedMsg } from "../../styled-components/game_styles";

import Store from "../../stores/main";

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
  console.log(store.countdown.timer);
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
            return <span>Get Ready!</span>;
          case Phases.complete:
            return (
              <CompletedMsg>
                <span>You have completed the race!</span>
                <TryAgain
                  onClick={() => {
                    //reset game state here
                    store.gameData.reset();
                  }}
                >
                  Try Again?
                </TryAgain>
              </CompletedMsg>
            );
          case Phases.typing:
            return <TypingInterface gameData={game} phase={phase} />;
          default:
            return <span>Phase could not be determined</span>;
        }
      })()}
    </div>
  );
});

export default SinglePlayer;
