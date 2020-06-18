import React from "react";
import { Character } from "../../util";
import { Theme } from "../../themes/theme_colors.";
import Color from "color";

type Props = {
  char: Character;
};
function handleStyles(char: Character) {
  let styles: any = {
    fontSize: "14px",
  };
  if (char.completed) {
    const color = Color(Theme.colorSuccess);
    styles = {
      ...styles,
      backgroundColor: char.char === " " ? color.alpha(0.35) : "inherit",
      color: Theme.colorSuccess,
    };
  }
  return styles;
}
function IndividualCharacter({ char }: Props) {
  const styles = handleStyles(char);
  return <span style={styles}>{char.char}</span>;
}

export default IndividualCharacter;
