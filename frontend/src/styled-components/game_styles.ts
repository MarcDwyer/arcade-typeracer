import styled from "styled-components";
import { Theme } from "../themes/theme_colors.";

export const TypeRacingDiv = styled.div`
    background-color: ${Theme.bgColor};
    color: #eee;
    border-radius: 5px;
    padding: 15px 15px;

    input {
        margin-top: 10px;
    }
`;

export const CompletedMsg = styled.div`
display: flex;
flex-direction: column;

    span {
        margin-bottom: 5px;
    }
`;
