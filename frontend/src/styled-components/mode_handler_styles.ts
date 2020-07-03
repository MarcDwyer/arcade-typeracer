import styled from "styled-components";
import { Theme } from "../themes/theme_colors.";

export const GameDataDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  background-color: ${Theme.bgColor};
  padding: 15px 15px;
  border-radius: 5px;
  width: 200px;
  order: 0;
  text-align: left;

  
  * {
    margin: 0 0 8.5px 0;
  }
`;

type PModeHandler = {
  bgColor?: string;
};
export const ModeHandlerDiv = styled.div<PModeHandler>`
  background-color: ${(p) => p.bgColor || Theme.shadeColor};
  min-height: 450px;
  min-width: 850px;
  display: flex;
  flex-direction: column;
  border: solid 1px green;
  margin: auto;
  padding: 15px 15px;
`;

export const ModeDisplayDiv = styled.div`
margin: auto;
display: flex;
`;

type PCountDownDiv = {
  margin?: string;
};
export const CountDownDiv = styled.div<PCountDownDiv>`
  display: flex;
   margin: ${(p) => p.margin || "auto auto auto 15px"};
   order: 1;

   span {
     margin: auto;
   }
`;
