import React, { useEffect } from "react";
import { useParams } from "react-router";

import SinglePlayer from "../SinglePlayer/single_player";
import { RouteModes } from "../../App";
import { useDispatch } from "react-redux";
import { loadTyping } from "../../actions/typing_actions";
import { validRouteMode } from "../../util";

function ModeHandler() {
  const { mode } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!validRouteMode(mode)) return;
    dispatch(loadTyping(mode));
  }, []);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default ModeHandler;
