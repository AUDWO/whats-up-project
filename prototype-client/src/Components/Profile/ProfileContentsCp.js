import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

//Styled-Components
import {
  ContentsWrapper,
  ContentCardsWrapper,
  ContentCardWrapper,
  ContentCard,
  ContentCardNoImg,
  DiaryPublicOffIcon,
  SpaceCp,
} from "../../StyledComponents/ProfileStyle/ProfileContentsCpSt";

//Components
import NoPostContentCp from "./NoPostContentCp";
import ProfilePostsInfoCp from "./ProfilePostsInfoCp";
import ProfileDiaryCardCp from "./ProfileContentCard/ProfileDiaryCardCp";
import ProfilePostCardCp from "./ProfileContentCard/ProfilePostCardCp";

//Atoms
import toggleValueAtom from "../../store/ToggleValueAtom";
import defaultTrueToggleValueAtom from "../../store/defaultTrueToggleValueAtom";

//Custom hook
import UserInfoQuery from "../../customHooks/userInfoQuery";

const ProfileContentsCp = ({ otherUserId }) => {
  //otherUserProfileContents

  const userInfo = UserInfoQuery();

  console.log(userInfo, "userInfo userInfo userInfo userInfo userInfo");

  //OtherUserProfile-Info--------------------------------------------------------
  const [otherUserDiaryContents, setOhterUserDiaryContents] = useState([]);
  const [otherUserPostContents, setOtherUserPostContents] = useState([]);
  const [otherUserProfilecontentsInfo, setOtherUserProfileContentsInfo] =
    useState({});

  const [otherUserLoading, setOtherUserLoading] = useState(false);

  const postContentsOpen = useRecoilValue(
    defaultTrueToggleValueAtom(
      `postContentsOpen${otherUserId ? otherUserId : userInfo.id}`
    )
  );
  const diaryContentsOpen = useRecoilValue(
    toggleValueAtom(
      `diaryContentsOpen${otherUserId ? otherUserId : userInfo.id}`
    )
  );

  //Inquiry otherUserProfile-Id
  const handleUser = () => {
    if (otherUserId) {
      return otherUserId;
    }
  };

  //Get otherUserProfile-Info
  useEffect(() => {
    if (otherUserId) {
      getOtherUserProfileInfo();
    }
  }, [otherUserId]);

  //OtherUserProfile-Info-------------------------------------------------------

  //MyProfile-Info--------------------------------------------------------------
  const fetchPostContentsData = async () => {
    try {
      const response = await axios.get(`/page/render-posts/${userInfo.id}`);

      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDiaryContentsData = async () => {
    try {
      const response = await axios.get(`/page/render-diaries/${userInfo.id}`);

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const postContentsData = useQuery({
    queryKey: ["postContentsInfo"],
    queryFn: fetchPostContentsData,
    enabled: !otherUserId,
  });

  const diaryContentsData = useQuery({
    queryKey: ["diaryContentsInfo"],
    queryFn: fetchDiaryContentsData,
    enabled: !otherUserId,
  });

  const fetchOtherUserProfileContentsData = async () => {
    try {
      const contentsResponse = await axios.get(
        `/page/render-posts/${handleUser()}`
      );

      const diaryContentsResponse = await axios.get(
        `/page/render-diaries/${handleUser()}`
      );
      setOhterUserDiaryContents([...diaryContentsResponse.data]);
      setOtherUserPostContents([...contentsResponse.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOtherUserProfileContentsInfoData = async () => {
    try {
      const contentsInfoResponse = await axios.get(
        `/page/user-info/${otherUserId}`
      );
      setOtherUserProfileContentsInfo({ ...contentsInfoResponse.data });
    } catch (error) {
      console.error(error);
    }
  };

  const getOtherUserProfileInfo = async () => {
    await fetchOtherUserProfileContentsData();
    await fetchOtherUserProfileContentsInfoData();
    setOtherUserLoading(true);
  };

  if (otherUserId && otherUserLoading) {
    return (
      <>
        <ProfilePostsInfoCp contentsInfo={otherUserProfilecontentsInfo} />
        {(
          diaryContentsOpen
            ? otherUserDiaryContents.length >= 1
            : otherUserPostContents.length >= 1
        ) ? (
          <>
            <ContentsWrapper>
              <ContentCardsWrapper>
                {diaryContentsOpen
                  ? otherUserDiaryContents.map((content) =>
                      content.publicControl ? (
                        <ProfileDiaryCardCp content={content} myCard={false} />
                      ) : (
                        <ContentCardWrapper>
                          {content.img ? (
                            <ContentCard src={content.img} />
                          ) : (
                            <ContentCardNoImg>Diary</ContentCardNoImg>
                          )}
                          <DiaryPublicOffIcon />
                        </ContentCardWrapper>
                      )
                    )
                  : otherUserPostContents.map((content) => (
                      <ProfilePostCardCp content={content} myTrue={false} />
                    ))}
              </ContentCardsWrapper>
            </ContentsWrapper>
            <SpaceCp />
          </>
        ) : (
          <>
            {postContentsOpen && (
              <NoPostContentCp
                type={"otherUser"}
                title={"게시물 없음"}
                content={"아직 회원님의 게시물이 존재하지 않습니다"}
              />
            )}
            {diaryContentsOpen && (
              <NoPostContentCp
                type={"otherUser"}
                title={"일기 없음"}
                content={"아직 회원님의 공개된 일기가 존재하지 않습니다"}
              />
            )}
          </>
        )}
      </>
    );
  }

  //내 프로필
  if (
    !otherUserId &&
    userInfo &&
    postContentsData.data &&
    diaryContentsData.data
  ) {
    return (
      <>
        <ProfilePostsInfoCp contentsInfo={userInfo} />

        {(
          diaryContentsOpen
            ? diaryContentsData?.data?.data.length >= 1
            : postContentsData?.data?.data.length >= 1
        ) ? (
          <>
            <ContentsWrapper>
              <ContentCardsWrapper>
                {diaryContentsOpen
                  ? diaryContentsData.data.data.map((content) => (
                      <ProfileDiaryCardCp content={content} myCard={true} />
                    ))
                  : postContentsData.data.data.map((content) => (
                      <ProfilePostCardCp content={content} myCard={true} />
                    ))}
              </ContentCardsWrapper>
            </ContentsWrapper>
            <SpaceCp />
          </>
        ) : (
          <>
            {postContentsOpen && (
              <NoPostContentCp
                type={"post"}
                title={"게시물 올리기"}
                content={"게시물을 올리면 회원님의 프로필에 표시됩니다."}
                subtitle={"게시물 올리기"}
              />
            )}
            {diaryContentsOpen && (
              <NoPostContentCp
                type={"diary"}
                title={"일기 쓰기"}
                content={"일기를 쓰면 회원님의 프로필에 표시됩니다."}
                subtitle={"일기 쓰기"}
              />
            )}
          </>
        )}
      </>
    );
  }
};

export default ProfileContentsCp;
