import React, { useEffect, useRef } from "react";

import IndividualChar from "../Individual_Character/individualChar";

import { TypeRacingDiv } from "../../styled-components/game_styles";

import { MyInput } from "../../styled-components/inputs";

import "./typing_interface.scss";
import { Character } from "../../util";

type Props = {
  text: Character[];
  value: string;
  error: string | null;
  handleTyping: (char: string) => void;
};

const TypingInterface = ({ error, value, text, handleTyping }: Props) => {
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
                text.map((char) => {
                  return <IndividualChar key={char.id} char={char} />;
                })}
            </div>
            <MyInput
              //@ts-ignore
              ref={inputRef}
              value={value}
              onChange={(e) => {
                let char = e.target.value;
                char = char[char.length - 1];
                handleTyping(char);
              }}
            />
          </TypeRacingDiv>
        </>
      )}
    </div>
  );
};

export default TypingInterface;
