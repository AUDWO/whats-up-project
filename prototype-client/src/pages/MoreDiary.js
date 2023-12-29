import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { UserInfoProvider } from "../contextApi/UserInfoProvider";
import MoreDiaryContentCp from "../Components/MoreDiary/MoreDiaryContentCp";
//import { UserInfoProvider } from "../contextApi/UserInfoProvider";

const MoreDiary = () => {
  const { diaryId } = useParams();

  /*
  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const response = await axios.get(
          `/page/render-only-diaryinfo/${diaryId}`
        );
        setDiary({ ...response.data[0] });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiaryData();
  }, []);*/

  return (
    <Wrapper>
      <HomeWrapper2>
        <MainSideBarCp />
        <UserInfoProvider>
          <MoreDiaryContentCp diaryId={diaryId} />
        </UserInfoProvider>
        <Section33 />
      </HomeWrapper2>

      <MoreCommentsCp diaryId={diaryId} moreType={"diary"} />
    </Wrapper>
  );
};

export default MoreDiary;
