import React from "react";
import DiaryPostImg from "./DiaryPostImg";
import DiaryPostInfo from "./DiaryPostInfo";
import { DiaryPostWrapper } from "../../../StyledComponents/DiaryStyle/DiaryPost";

import styled from "styled-components";
const DiaryPostCp = ({ diary }) => {
  return (
    <DiaryPostWrapper>
      {diary.img ? (
        <DiaryPostImg diaryImg={diary.img} />
      ) : (
        <NoDiaryPostImg>Diary</NoDiaryPostImg>
      )}
      <DiaryPostInfo diaryInfo={diary} />
    </DiaryPostWrapper>
  );
};

export default DiaryPostCp;

const NoDiaryPostImg = styled.div`
  background-color: #f7dd07;
  color: black;
  width: 100%;
  height: 50%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  font-weight: 700;
`;
