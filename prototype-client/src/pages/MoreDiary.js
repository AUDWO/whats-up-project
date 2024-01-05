import React from "react";
import { useParams } from "react-router-dom";

//Styled-Components
import {
  Wrapper,
  HomeWrapper2,
  Section33,
} from "../StyledComponents/MoreDiaryStyle/MoreDiarySt";

//Component
import MainSideBarCp from "../Components/MainSideBar/MainSideBarCp";
import MoreCommentsCp from "../Components/Common/More/MoreComment/MoreCommentsCp";
import MoreDiaryContentCp from "../Components/MoreDiary/MoreDiaryContentCp";

const MoreDiary = () => {
  const { diaryId } = useParams();

  return (
    <Wrapper>
      <HomeWrapper2>
        <MainSideBarCp />
        <MoreDiaryContentCp diaryId={diaryId} />
        <Section33 />
      </HomeWrapper2>

      <MoreCommentsCp diaryId={diaryId} moreType={"diary"} />
    </Wrapper>
  );
};

export default MoreDiary;
