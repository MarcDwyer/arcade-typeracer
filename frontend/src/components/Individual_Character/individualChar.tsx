import React from "react";
import { Character } from "../../util";
import { Theme } from "../../themes/theme_colors.";

type Props = {
  char: Character;
  index: number;
};
function handleStyles(char: Character) {
  let styles = {};
  if (char.completed) {
    styles = {
      ...styles,
      color: Theme.colorSuccess,
    };
  }
  return styles;
}
function IndividualCharacter({ char, index }: Props) {
  const styles = handleStyles(char);
  return (
    <span key={index} style={styles}>
      {char.char}
    </span>
  );
}

export default IndividualCharacter;
