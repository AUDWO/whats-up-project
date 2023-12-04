import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

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
import stateUpdateAtom from "../../store/stateUpdateAtom";
import userInfoAtom from "../../store/userState/userAtom";
import { useUserInfoValue } from "../../contextApi/UserInfoProvider";

const ProfileContentsCp = ({ otherUserId, userInfo }) => {
  const userInfo2 = useUserInfoValue();
  console.log("userInfo2", userInfo2);
  console.log("profileContentsCp !!!???");
  const [contents, setContents] = useState([]);
  const [contentsInfo, setContentsInfo] = useState({});

  const [postContentsOpen, setPostContentsOpen] = useRecoilState(
    toggleValueAtom("postContentsOpen")
  );
  const diaryContentsOpen = useRecoilValue(
    toggleValueAtom("diaryContentsOpen")
  );
  const [contentLender, setContentLender] = useRecoilState(
    toggleValueAtom("contentLender")
  );
  const contentUpdate = useRecoilValue(stateUpdateAtom("contentUpdate"));

  const handleUser = () => {
    if (otherUserId) {
      return otherUserId;
    }
    if (userInfo) {
      return userInfo.id;
    }
  };

  const handleType = () => {
    if (postContentsOpen) {
      return "posts";
    }
    if (diaryContentsOpen) {
      return "diaries";
    }
  };

  //const userInfo = useRecoilValue(userInfoAtom);

  useEffect(() => {
    if (!diaryContentsOpen) {
      setPostContentsOpen(true);
    }

    const fetchContentsData = async () => {
      try {
        if (postContentsOpen || diaryContentsOpen) {
          const contentsResponse = await axios.get(
            `/page/render-${handleType()}/${handleUser()}`
          );
          if (diaryContentsOpen) {
          }

          setContents([...contentsResponse.data]);
          setContentLender(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchContentsInfoData = async () => {
      try {
        const contentsInfoResponse = await axios.get(
          `/page/user-info/${otherUserId}`
        );
        setContentsInfo({ ...contentsInfoResponse.data });
      } catch (error) {
        console.error(error);
      }
    };

    if (otherUserId) {
      fetchContentsInfoData();
    }
    fetchContentsData();
    //otherUserId : 다른사람 프로필에서 내 프로필로 이동 시 필요
  }, [postContentsOpen, diaryContentsOpen, contentUpdate, otherUserId]);

  //[postContentsOpen, diaryContentsOpen, contentUpdate, otherUserId]
  if (otherUserId && Object.keys(contentsInfo).length >= 1) {
    return (
      <>
        <ProfilePostsInfoCp contentsInfo={contentsInfo} />
        {contents.length >= 1 ? (
          <>
            <ContentsWrapper>
              <ContentCardsWrapper>
                {contents.map((content) => (
                  <>
                    {diaryContentsOpen ? (
                      <>
                        {content.publicControl ? (
                          <ProfileDiaryCardCp
                            content={content}
                            myCard={false}
                          />
                        ) : (
                          <ContentCardWrapper>
                            {content.img ? (
                              <ContentCard src={content.img} />
                            ) : (
                              <ContentCardNoImg>Diary</ContentCardNoImg>
                            )}
                            <DiaryPublicOffIcon />
                          </ContentCardWrapper>
                        )}
                      </>
                    ) : (
                      <ProfilePostCardCp content={content} myTrue={false} />
                    )}
                  </>
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

  if (userInfo && contentLender) {
    return (
      <>
        <ProfilePostsInfoCp contentsInfo={userInfo} />
        {contents.length >= 1 ? (
          <>
            <ContentsWrapper>
              <ContentCardsWrapper>
                {contents.map((content) => (
                  <>
                    {diaryContentsOpen ? (
                      <ProfileDiaryCardCp content={content} myCard={true} />
                    ) : (
                      <ProfilePostCardCp content={content} myCard={true} />
                    )}
                  </>
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
