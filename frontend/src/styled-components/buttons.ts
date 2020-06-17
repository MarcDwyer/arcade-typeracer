import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "../themes/theme_colors.";

const BtnColors = {
  standard: "#676A76",
  default: Theme.bgColor,
  success: "#87B05E",
};
const sharedProps = css`
  box-shadow: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
`;
type BtnColorKeys = keyof typeof BtnColors;

interface PModelLink {
  bordercolor?: string;
}
export const ModeLink = styled(Link)<PModelLink>`
  ${sharedProps}
  border: solid 4px ${(p) => p.bordercolor || BtnColors.standard};
  padding: 15px 15px;

  &:hover {
    color: ${Theme.arcade_green} !important;
    border: 4px solid ${Theme.arcade_green};
  }
`;

type StandardBtnProps = {
  colorType?: BtnColorKeys;
};
export const StandardBtn = styled.button<StandardBtnProps>`
  ${sharedProps}
  padding: 15px 15px;
  background-color: ${Theme.arcade_green};
  color: black;
  border: none;
  transition: background-color 0.25s ease;
`;

export const TryAgain = styled.button`
  ${sharedProps}
  background-color: transparent;
  border: none;
  color: inherit;
`;
