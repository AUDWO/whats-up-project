import styled from "styled-components";

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

let borderDynamic = (props) => {
  let borderValue = ``;
  for (const key in props) {
    if (borderDirection[key]) {
      borderValue += `
            ${borderDirection[key]} : ${props[key].borderPx} solid ${props[key].color}
            `;
    }
  }

  return borderValue;
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

let paddingDirection = {
  paddingT: "padding-top",
  paddingL: "padding-left",
  paddingB: "padding-bottom",
  paddingR: "padding-right",
};

let marginDirection = {
  marginL: "margin-left",
  marginR: "margin-right",
  marginB: "margin-bottom",
  marginT: "margin-top",
};

let borderDirection = {
  borderL: "border-left",
  borderR: "border-right",
  borderT: "border-top",
  borderB: "border-bottom",
};
//  border: ${(props) => props.border.borderPx} solid
//${(props) => props.border.color};

export const Input = styled.input`
  font-size: ${(props) => props.fontSize};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderR};
  padding: ${(props) => props.padding};
  ${(props) => paddingDynamic(props)};
  ${(props) => marginDynamic(props)};
  background-color: ${(props) => props.backC};
  border: ${(props) =>
    props.border
      ? `${props.border.borderPx} solid
    ${props.border.color}`
      : "none"};
  ${(props) => borderDynamic(props)};
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: 글자색;
    -webkit-box-shadow: 0 0 0px 1000px 배경색 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
