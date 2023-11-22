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

export const ConfigWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 10px;

  border-top: 0.5px solid gray;
`;

export const ConfigOptionWrapper = styled.div`
  height: ${(props) => (props.height ? props.height : "")};
  padding:10px;
   0px;
  ${(props) => marginDynamic(props)};
  display:flex;
  flex-direction:${(props) => (props.flexD ? props.flexD : "")};
`;

export const PostButtonWrapper = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
`;

export const PostButton = styled.span`
  border-radius: 10px;
  background-color: #f7dd07;
  color: white;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
`;
