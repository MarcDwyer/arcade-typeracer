import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/main";
import { Phases } from "../../enums";

import { StandardBtn } from "../../styled-components/buttons";
import { UserNameInput } from "../../styled-components/inputs";

export default function MultiPlayer() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>("");

  const [phase] = useSelector((
    store: ReduxStore.State,
  ) => [store.status.phase]);
  console.log(phase);
  return (
    <div className="multi">
      {(() => {
        switch (phase) {
          case Phases.waiting:
            return (
              <UserNameInput
                value={userName}
                color="white"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter a display name"
              />
            );
          default:
            return <span>Case not found for phase</span>;
        }
      })()}
    </div>
  );
}
