import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//Styled-Components
import {
  DiaryContentsWrapper,
  DiaryContent,
  DiaryDate,
  DiaryImg,
  NoDiaryImg,
  DiaryWrapper,
  DiaryNav,
  Wrapper,
  HomeWrapper2,
  MoreDiaryTitle,
  MoreProfileImg,
  MoreProfileName,
  MoreProfileWrapper,
  DiaryImgWrapper,
  Section33,
} from "../StyledComponents/MoreDiaryStyle/MoreDiarySt";

//Component
import MainSideBarCp from "../Components/MainSideBar/MainSideBarCp";
import MoreCommentsCp from "../Components/Common/More/MoreComment/MoreCommentsCp";
import MoreContactCp from "../Components/Common/More/MoreContact/MoreContactCp";

const MoreDiary = () => {
  const { diaryId } = useParams();

  const [diary, setDiary] = useState(null);

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
  }, []);

  if (diary) {
    return (
      <Wrapper>
        <HomeWrapper2>
          <MainSideBarCp />
          <DiaryWrapper>
            <MoreDiaryTitle>{diary.title}</MoreDiaryTitle>
            <DiaryNav>
              <MoreProfileWrapper>
                <MoreProfileImg />
                <MoreProfileName>{diary.User.nickname}</MoreProfileName>
              </MoreProfileWrapper>
              <DiaryDate>2023.09.19</DiaryDate>
            </DiaryNav>
            <DiaryContentsWrapper padding="40px 20px">
              <DiaryImgWrapper>
                {diary.img ? (
                  <DiaryImg src={diary.img} />
                ) : (
                  <NoDiaryImg>Diary</NoDiaryImg>
                )}
              </DiaryImgWrapper>
              <DiaryContent>{diary.content}</DiaryContent>
              {diary.likeControl && (
                <MoreContactCp contentInfo={diary} reactType={"diary"} />
              )}
            </DiaryContentsWrapper>
          </DiaryWrapper>
          <Section33 />
        </HomeWrapper2>

        {diary.commentControl && <MoreCommentsCp diaryId={diaryId} />}
      </Wrapper>
    );
  }
};

export default MoreDiary;
