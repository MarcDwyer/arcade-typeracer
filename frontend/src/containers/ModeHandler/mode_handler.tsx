import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";
import Countdown from "react-countdown";

import { RouteModes } from "../../enums";
import { useDispatch, useSelector } from "react-redux";
import { loadTyping, handleCountEnd } from "../../actions/typing_actions";
import { validRouteMode } from "../../util";
import { ReduxStore } from "../../reducers/main";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();
  const countdown = useSelector(
    (store: ReduxStore.State) => store.typing.countdown
  );

  useEffect(() => {
    if (!validRouteMode(mode)) return;
    dispatch(loadTyping(mode));
  }, []);
  console.log(countdown);
  return (
    <div className="mode-handler">
      {countdown && (
        <Countdown
          date={countdown}
          onComplete={() => dispatch(handleCountEnd())}
        />
      )}
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
  );
}

export default ModeHandler;
