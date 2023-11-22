import React from "react";
import {
  DiaryPostImgWrapper,
  DiaryImg,
} from "../../../StyledComponents/DiaryStyle/DiaryPost";

const DiaryPostImg = ({ diaryImg }) => {
  return (
    <DiaryPostImgWrapper>
      <DiaryImg src={diaryImg} />
    </DiaryPostImgWrapper>
  );
};

export default DiaryPostImg;
