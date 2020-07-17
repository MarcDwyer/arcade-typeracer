import React, { useEffect, useRef } from "react";

import IndividualChar from "../Individual_Character/individualChar";
import { useDispatch } from "react-redux";
import { handleTyping } from "../../actions/typing_actions";
import { TextData } from "../../reducers/text_reducer";
import { PhaseTypes } from "../../reducers/status_reducer";

import { TypeRacingDiv } from "../../styled-components/game_styles";

import { MyInput } from "../../styled-components/inputs";

import "./typing_interface.scss";
import { Phases } from "../../enums";
import { Character } from "../../util";

type Props = {
  textData: TextData;
  text: Character[];
  phase: PhaseTypes;
};

function TypingInterface({ text, phase }: Props) {
  const { text, value, error } = props.textData;
  const inputRef = useRef<HTMLInputElement | null>();
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="typing-interface">
      {text && (
        <>
          <TypeRacingDiv>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <div className="text-data">
              {text &&
                text.map((char, index) => {
                  return <IndividualChar key={index} char={char} />;
                })}
            </div>
            <MyInput
              disabled={props.phase === Phases.complete}
              //@ts-ignore
              ref={inputRef}
              value={value}
              onChange={(e) => {
                let char = e.target.value;
                char = char[char.length - 1];
                dispatch(handleTyping(char));
              }}
            />
          </TypeRacingDiv>
        </>
      )}
    </div>
  );
}

export default TypingInterface;
