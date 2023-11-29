import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

//Styled-Components
import {
  PostImgWrapper,
  ProfileWrapper,
  Profile,
  ProfileImg,
  ProfileImgWrapper,
  PostImg,
  ProfileUsername,
  PostContentsWrapper,
  PostTitleWrapper,
  PostUserInfoWrapper,
  PostUserName,
  PostTitle,
  PostContentOpenIcon,
  PostContentCloseIcon,
  PostContent,
} from "../../StyledComponents/PostStyle/PostContentCpSt";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";
import userInfoAtom from "../../store/userState/userAtom";
import toggleValueAtom from "../../store/ToggleValueAtom";

const PostContentCp = ({ postContent, userId }) => {
  const click = useRecoilValue(
    ModalOpenAtom(`commentModalOpen${postContent.id}`)
  );
  const [postContentControl, setPostContent] = useState(
    postContent.contentControl
  );
  const [postContentOpen, setPostContentOpen] = useState(false);

  const userInfo = useRecoilValue(userInfoAtom);

  const [postUserInfo, setPostUserInfo] = useState({});

  const [fetchSuccess, setFetchSuccess] = useState(false);

  const handleIconClick = () => {
    setPostContentOpen(!postContentOpen);
  };

  //댓글창이 먼저 나오지 않도록
  const setIsImgLoaded = useSetRecoilState(toggleValueAtom("isImgLoaded"));
  const postImgRef = useRef(null);

  useEffect(() => {
    const FindUerById = async (id) => {
      const response = await axios.get(`/user/${id}`);
      setPostUserInfo({ ...response.data });
      setFetchSuccess(true);
    };

    FindUerById(userId);
    console.log("셋 타임 아웃 고 슛~");
    setTimeout(() => {
      setIsImgLoaded(true);
    }, 2000);
  }, []);

  useEffect(() => {
    const updateImgLoadingStatus = (img) => {
      const isLoaded = img.compelte && img.naturalHeight !== 0;
      console.log("실행 됐어유~");
      setIsImgLoaded(isLoaded);
    };
    if (postImgRef.current) {
      postImgRef.current.addEventListener("load", () =>
        updateImgLoadingStatus(postImgRef.current)
      );
    }
  }, []);

  if (fetchSuccess) {
    return (
      <PostImgWrapper click={click}>
        <PostImg src={postContent.url} ref={postImgRef} />
        {userInfo.id === postUserInfo.id ? (
          <Link to={`/dashboard/profile/`}>
            <ProfileWrapper>
              <Profile>
                <ProfileImgWrapper>
                  <ProfileImg src={postUserInfo.profileImg} />
                </ProfileImgWrapper>
                <ProfileUsername>{postUserInfo.nickname}</ProfileUsername>
              </Profile>
            </ProfileWrapper>
          </Link>
        ) : (
          <Link to={`/dashboard/profile/${postUserInfo.nickname}/${userId}`}>
            <ProfileWrapper>
              <Profile>
                <ProfileImgWrapper>
                  <ProfileImg src={postUserInfo.profileImg} />
                </ProfileImgWrapper>
                <ProfileUsername>{postUserInfo.nickname}</ProfileUsername>
              </Profile>
            </ProfileWrapper>
          </Link>
        )}

        <PostContentsWrapper>
          <PostTitleWrapper>
            <PostUserInfoWrapper>
              <PostUserName>{postUserInfo.nickname}</PostUserName>
              <PostTitle>{postContent.title}</PostTitle>
            </PostUserInfoWrapper>
            {postContentControl && (
              <>
                {!postContentOpen ? (
                  <PostContentOpenIcon
                    // setPostContentOpen={!postContentOpen}
                    onClick={handleIconClick}
                  />
                ) : (
                  <PostContentCloseIcon onClick={handleIconClick} />
                )}
              </>
            )}
          </PostTitleWrapper>

          {postContentOpen && <PostContent>{postContent.content}</PostContent>}
        </PostContentsWrapper>
      </PostImgWrapper>
    );
  }
};

export default PostContentCp;
