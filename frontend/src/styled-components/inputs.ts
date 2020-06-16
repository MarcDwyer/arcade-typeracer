import styled from "styled-components";

enum InputColors {
  standard = "#676A76",
}

export const MyInput = styled.input`
    padding: 15px 15px;
    color: #eee;
    background-color: ${InputColors.standard};
    outline: none;
    border: none;
`;
