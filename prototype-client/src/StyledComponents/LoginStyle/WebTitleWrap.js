import styled from "styled-components";

let marginDirection = {
  marginL: "margin-left",
  marginR: "margin-right",
  marginB: "margin-bottom",
  marginT: "margin-top",
};

let paddingDirection = {
  paddingT: "padding-top",
  paddingL: "padding-left",
  paddingB: "padding-bottom",
  paddingR: "padding-right",
};

let paddingDynamic = (props) => {
  let paddingValue = ``;

  for (const key in props) {
    if (paddingDirection[key]) {
      paddingValue += `
      ${paddingDirection[key]} : ${props[key]}px
      `;
    }
  }

  return paddingValue;
};

let marginDynamic = (props) => {
  let marginValue = ``;

  for (const key in props) {
    if (marginDirection[key]) {
      marginValue += `
      ${marginDirection[key]} : ${props[key]}px
      `;
    }
  }

  return marginValue;
};

const WebTitleWrap = styled.div`
  ${(props) => marginDynamic(props)}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 300px;
`;

export default WebTitleWrap;
