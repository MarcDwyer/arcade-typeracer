import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTyping, setStatus } from "../../actions/typing_actions";
import { ReduxStore } from "../../reducers/main";
import { Status } from "../../reducers/typing_reducer";

export default function SinglePlayer() {
  const dispatch = useDispatch();
  const tData = useSelector((store: ReduxStore.State) => store.typing);

  useEffect(() => {
    dispatch(setStatus(Status.waiting));
  }, []);
  useEffect(() => {
    const { status } = tData;
    switch (status.currStatus) {
      case Status.waiting:
        dispatch(loadTyping());
    }
  }, [tData.status]);
  return (
    <span>this is single player noob</span>
  );
}
