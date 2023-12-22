import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DiaryWrapper,
  MoreDiaryTitle,
  DiaryNav,
  MoreProfileImg,
  MoreProfileWrapper,
  MoreProfileName,
  DiaryDate,
  DiaryContentsWrapper,
  DiaryImgWrapper,
  DiaryImg,
  NoDiaryImg,
  DiaryContent,
} from "../../StyledComponents/MoreDiaryStyle/MoreDiarySt";

import MoreContactCp from "../Common/More/MoreContact/MoreContactCp";

const MoreDiaryContentCp = ({ diaryId }) => {
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDiaryData = async () => {
      try {
        const response = await axios.get(
          `/page/render-only-diaryinfo/${diaryId}`
        );
        setDiary({ ...response.data[0] });
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiaryData();
  }, []);
  if (loading)
    return (
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
            <MoreContactCp contentInfo={diary} moreType={"diary"} />
          )}
        </DiaryContentsWrapper>
      </DiaryWrapper>
    );
};

export default MoreDiaryContentCp;
