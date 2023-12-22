import React from "react";

//Styled-Component
import {
  Option,
  ToggleAbleButtonWrapper,
  AbleButtonTitle,
} from "../../StyledComponents/CommonCpStyle/AddvancedSetUp/AddvancedSetupCpSt";

//Component
import ToggleAbleSwitchComponent from "../WriteDiary/ToggleAbleSwitchComponent";

const PostAdvancedSetupCp = () => {
  return (
    <Option height={"210px"}>
      <ToggleAbleButtonWrapper>
        <AbleButtonTitle>좋아요 수 기능 해제</AbleButtonTitle>
        <ToggleAbleSwitchComponent
          inputId={"likeCount"}
          atomName={"postLike"}
        />
      </ToggleAbleButtonWrapper>
      <ToggleAbleButtonWrapper>
        <AbleButtonTitle>댓글 기능 해제</AbleButtonTitle>
        <ToggleAbleSwitchComponent
          inputId={"Comments"}
          atomName={"postCommentForbid"}
        />
      </ToggleAbleButtonWrapper>
      <ToggleAbleButtonWrapper>
        <AbleButtonTitle> 내용 작성 안함 </AbleButtonTitle>
        <ToggleAbleSwitchComponent inputId={"hits"} atomName={"postContent"} />
      </ToggleAbleButtonWrapper>
    </Option>
  );
};

export default PostAdvancedSetupCp;
