import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../enums";

import EnterDisplayName from "../../components/EnterDisplatName/enter_display";

export default function MultiPlayer() {
  const [phase, ws, multi] = useSelector((
    store: ReduxStore.State,
  ) => [store.status.phase, store.socket, store.multi]);
  console.log(multi);
  return (
    <div className="multi">
      {ws && (() => {
        switch (phase) {
          case Phases.waiting:
            return <EnterDisplayName ws={ws} />;
          default:
            return <span>Case not found for phase</span>;
        }
      })()}
    </div>
  );
}
