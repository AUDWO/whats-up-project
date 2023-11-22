import styled from "styled-components";

export const ToggleSwitchWrapper = styled.div``;

export const ToggleButton = styled.span`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #555555;
  transition: all 0.2s ease-in;
`;

export const ToggleSwitch = styled.label`
  width: 64px;
  height: 32px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin: 30px;
  transition: all 0.2s ease-in;

  border: 3px solid #555555;
`;

export const Checkbox = styled.input`
  &:checked + ${ToggleSwitch} {
    border: 3px solid #f7dd07;
    ${ToggleButton} {
      left: calc(100% - 25px);
      background-color: #f7dd07;
    }
  }
`;
