import React from "react";

import IndividualChar from "../Individual_Character/individualChar";
import { useDispatch } from "react-redux";
import { handleTyping } from "../../actions/game_actions";
import { TextData } from "../../reducers/reducer_types";
import { PhaseTypes } from "../../reducers/reducer_types";

import "./typing_interface.scss";
import { Phases } from "../../enums";

type Props = {
  textData: TextData;
  phase: PhaseTypes;
};

function TypingInterface(props: Props) {
  const dispatch = useDispatch();
  const { text, wordCount, value, error } = props.textData;
  return (
    <div className="typing-interface">
      {text && (
        <div className="typering">
          <span>{wordCount}</span>
          {error && <span>{error}</span>}
          <div className="text-data">
            {text && text.map((char, index) => {
              return (
                <IndividualChar key={index} char={char} />
              );
            })}
          </div>
          <input
            disabled={props.phase === Phases.complete}
            value={value}
            onChange={(e) => dispatch(handleTyping(e.target.value))}
          />
        </div>
      )}
    </div>
  );
}

export default TypingInterface;
