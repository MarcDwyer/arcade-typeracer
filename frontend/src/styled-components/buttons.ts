import styled from "styled-components";
import { Link } from "react-router-dom";

enum BtnColors {
  standard = "#676A76",
  success = "#87B05E",
}
type BtnColorKeys = keyof typeof BtnColors;

interface PModelLink {
  bordercolor?: string;
}
export const ModeLink = styled(Link)<PModelLink>`
  border: solid 2px ${(p) => p.bordercolor || BtnColors.standard};
  padding: 15px 15px;
  color: inherit;
  cursor: pointer;

  &:hover {
    border: 4px solid ${(p) => p.bordercolor || BtnColors.standard};
  }
`;

type StandardBtnProps = {
  colorType?: BtnColorKeys;
};
export const StandardBtn = styled.button<StandardBtnProps>`
  padding: 15px 15px;
  background-color: ${(p) =>
  p.colorType ? BtnColors[p.colorType] : BtnColors.standard};
  color: #eee;
  box-shadow: none;
  cursor: pointer;
  border: none;
`;
