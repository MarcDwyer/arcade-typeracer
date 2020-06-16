import styled from "styled-components";
import { Theme } from "../themes/theme_colors.";

export const MyInput = styled.input`
    padding: 10px 10px;
    border-radius: 5px;
    color: #eee;
    background-color: ${Theme.shadeColor};
    outline: none;
    border: none;
`;
