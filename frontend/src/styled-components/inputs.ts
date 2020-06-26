import styled, { css } from "styled-components";
import { Theme } from "../themes/theme_colors.";

const sharedInputStyles = css`
    border-radius: 5px;
    background-color: ${Theme.shadeColor};
    outline: none;
    border: none;
    padding: 10px 10px;
`;

export const MyInput = styled.input<PMyInput>`
    ${sharedInputStyles}
`;

type PMyInput = {
  color?: string;
};
export const UserNameInput = styled.input<PMyInput>`
    ${sharedInputStyles}
    width: 225px;
    height: 35px;
    font-size: 18px;
    color: ${(p) => p.color || "#eee"};
`;
