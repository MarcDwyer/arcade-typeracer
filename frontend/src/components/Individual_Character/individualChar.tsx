import React from "react";
import { Character } from "../../util";
import { Theme } from "../../themes/theme_colors.";

type Props = {
  char: Character;
};
function handleStyles(char: Character) {
  let styles: any = {
    fontSize: "14px",
  };
  if (char.completed) {
    styles = {
      ...styles,
      color: Theme.colorSuccess,
    };
  }
  return styles;
}
function IndividualCharacter({ char }: Props) {
  const styles = handleStyles(char);
  return (
    <span style={styles}>
      {char.char}
    </span>
  );
}

export default IndividualCharacter;
