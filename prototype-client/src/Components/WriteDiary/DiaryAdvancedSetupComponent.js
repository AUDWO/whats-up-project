import React from "react";

//Styled-Components
import {
  Option,
  ToggleAbleButtonWrapper,
  AbleButtonTitle,
} from "../../StyledComponents/CommonCpStyle/AddvancedSetUp/AddvancedSetupCpSt";

//Component
import ToggleAbleSwitchComponent from "./ToggleAbleSwitchComponent";

const DiaryAdvancedSetupCp = () => {
  return (
    <Option height={"140px"}>
      <ToggleAbleButtonWrapper>
        <AbleButtonTitle>반응 기능 해제</AbleButtonTitle>
        <ToggleAbleSwitchComponent
          inputId={"likeCount"}
          atomName={"diaryReact"}
        />
      </ToggleAbleButtonWrapper>
      <ToggleAbleButtonWrapper>
        <AbleButtonTitle>댓글 기능 해제</AbleButtonTitle>
        <ToggleAbleSwitchComponent
          inputId={"Comments"}
          atomName={"diaryComment"}
        />
      </ToggleAbleButtonWrapper>
    </Option>
  );
};

export default DiaryAdvancedSetupCp;
