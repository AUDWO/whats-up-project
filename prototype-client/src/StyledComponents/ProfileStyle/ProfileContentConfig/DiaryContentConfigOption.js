import styled from "styled-components";

export const ToggleValueTitle = styled.div`
  color: ${(props) => props.color};
`;

export const ToggleSwitchWrapper = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

export const ToggleSwitch = styled.label`
  width: 60px;
  height: 30px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: #dbdbdb;
  cursor: pointer;
  transition: all 0.2s ease-in;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ToggleButton = styled.span`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: white;
  transition: all 0.2s ease-in;
`;

export const Toggle = styled.input`
  &:checked + ${ToggleSwitch} {
    background: #f7dd07;
    ${ToggleButton} {
      left: calc(100% - 28px);
    }
  }
`;

//----

export const ConfigOptionTitle = styled.div`
  ${(props) => marginDynamic(props)};
`;

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

export const ConfigWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 10px;
  border-top: 0.5px solid gray;
`;

export const InputV2 = styled.input`
  color: black;
  border: none;
  border-bottom: 1px solid gray;
  background-color: #ffffff;
  font-size: 15px;
  margin-top: 15px;
  padding-bottom: 5px;
`;

export const ContentTextarea = styled.textarea`
  border: none;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  resize: none;
  outline: none;
  margin-top: 15px;
  height: 80px;
  padding: 10px 0px;
  padding-left: 3px;
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
/*
export const ProfileImg = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-size: 100px;
  object-fit: cover;
`;

export const ProfileImgSelectButtonWrapper = styled.label`
  width: 40%;
  height: auto;
  display: flex;
  justify-content: center;
  font-size: 17px;
  border-radius: 10px;
  padding: 10px 0px;
  &:hover {
    background-color: #f6f9f9;
  }
  cursor: pointer;
`;

export const OptionTitle = styled.div``;*/
