import styled from "styled-components";

let marginDirection = {
  marginL: "margin-left",
  marginR: "margin-right",
  marginB: "margin-bottom",
  marginT: "margin-top",
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

export const ConfigOptionTitle = styled.div`
  ${(props) => marginDynamic(props)};
`;

export const Email = styled.span`
  ${(props) => marginDynamic(props)};
`;
