import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";

//Styled-Components
import {
  PostImgWrapper,
  PostImg,
  PostContentsWrapper,
  PostTitleWrapper,
  PostUserInfoWrapper,
  PostUserName,
  PostTitle,
  PostContentOpenIcon,
  PostContentCloseIcon,
  PostContent,
} from "../../../../StyledComponents/PostStyle/PostContentCpSt";

//Atom
import ModalOpenAtom from "../../../../store/ModalOpenAtom";
import toggleValueAtom from "../../../../store/ToggleValueAtom";

//Component

//Custom hook
import UserInfoQuery from "../../../../customHooks/UserInfoQuery";
import PostProfileCp from "./PostProfileCp";

const PostContentCp = ({ postContentInfo, userId }) => {
  const [modalOpen, setModalOpen] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postContentInfo.id}`)
  );
  const [postContentControl] = useState(postContentInfo.contentControl);
  const [postContentOpen, setPostContentOpen] = useState(false);

  const handleIconClick = () => {
    setPostContentOpen(!postContentOpen);
  };

  //댓글창이 먼저 나오지 않도록
  const [isImgLoaded, setIsImgLoaded] = useRecoilState(
    toggleValueAtom(`isImgLoaded${postContentInfo.id}`)
  );
  const [postObservingCheck, setPostObservingCheck] = useState(false);

  const postImgRef = useRef(null);
  const postRef = useRef(null);

  useEffect(() => {
    return () => {
      setModalOpen(false);
      setIsImgLoaded(false);
    };
  }, []);

  const updateImgLoadingStatus = () => {
    setIsImgLoaded(true);
  };

  const userInfo = UserInfoQuery();

  const isMyPost = (() => {
    if (userInfo) {
      if (userInfo.id === postContentInfo.userInfo.id) return true;
      else return false;
    } else return false;
  })();

  useEffect(() => {
    const intersectionCallback = (entries) => {
      if (entries[0].isIntersecting) setPostObservingCheck(true);
    };

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver(intersectionCallback, options);
    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, []);

  console.log(isImgLoaded, `${postContentInfo.id} - isImgLoaded`);

  useEffect(() => {});

  return (
    <PostImgWrapper click={modalOpen} ref={postRef}>
      {!isImgLoaded && (
        <Blurhash
          hash={postContentInfo.hash}
          width={"410px"}
          height={"585px"}
        />
      )}
      <PostImg
        src={postObservingCheck && postContentInfo.url}
        onLoad={() => setIsImgLoaded(true)}
        ref={postImgRef}
        style={{
          display: isImgLoaded && postObservingCheck ? "inline" : "none",
        }}
      />

      {isMyPost ? (
        <Link to={`/dashboard/profile/`}>
          <PostProfileCp contentUserInfo={postContentInfo.userInfo} />
        </Link>
      ) : (
        <Link
          to={`/dashboard/profile/${postContentInfo.userInfo.nickname}/${userId}`}
        >
          <PostProfileCp contentUserInfo={postContentInfo.userInfo} />
        </Link>
      )}

      <PostContentsWrapper>
        <PostTitleWrapper>
          <PostUserInfoWrapper>
            <PostUserName>{postContentInfo.userInfo.nickname}</PostUserName>
            <PostTitle>{postContentInfo.title}</PostTitle>
          </PostUserInfoWrapper>
          {postContentControl && (
            <>
              {!postContentOpen ? (
                <PostContentOpenIcon onClick={handleIconClick} />
              ) : (
                <PostContentCloseIcon onClick={handleIconClick} />
              )}
            </>
          )}
        </PostTitleWrapper>

        {postContentOpen && (
          <PostContent>{postContentInfo.content}</PostContent>
        )}
      </PostContentsWrapper>
    </PostImgWrapper>
  );
};

export default PostContentCp;
