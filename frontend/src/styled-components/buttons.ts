import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "../themes/theme_colors.";

interface PModelLink {
  bordercolor?: string;
}
export const ModeLink = styled(Link)<PModelLink>`
  border: solid 2px ${(p) => p.bordercolor || Theme.btnColor};
  padding: 15px 15px;
  color: inherit;

  &:hover {
    border: 4px solid ${(p) => p.bordercolor || Theme.btnColor};
  }
`;
