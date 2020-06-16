import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "../themes/theme_colors.";

const BtnColors = {
  standard: "#676A76",
  default: Theme.bgColor,
  success: "#87B05E",
};
type BtnColorKeys = keyof typeof BtnColors;

interface PModelLink {
  bordercolor?: string;
}
export const ModeLink = styled(Link)<PModelLink>`
  border: solid 4px ${(p) => p.bordercolor || BtnColors.standard};
  padding: 15px 15px;
  color: inherit;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: ${Theme.arcade_green} !important;
    border: 4px solid ${Theme.arcade_green};
  }
`;

type StandardBtnProps = {
  colorType?: BtnColorKeys;
};
export const StandardBtn = styled.button<StandardBtnProps>`
  padding: 15px 15px;
  background-color: ${Theme.arcade_green};
  color: black;
  box-shadow: none;
  cursor: pointer;
  border: none;
  outline: none;
  font-family: inherit;
  transition: background-color .25s ease;
`;
