import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";

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
} from "../../StyledComponents/PostStyle/PostContentCpSt";

//Atom
import ModalOpenAtom from "../../store/ModalOpenAtom";
import toggleValueAtom from "../../store/ToggleValueAtom";
import { useUserInfoValue } from "../../contextApi/UserInfoProvider";
import ProfileCp from "../Common/Profile/ProfileCp";
//import CustomUseQuery from "../../customHooks/customUseQuery";

const PostContentCp = ({ postContentInfo, userId }) => {
  const userInfo = useUserInfoValue();

  const [modalOpen, setModalOpen] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postContentInfo.id}`)
  );
  const [postContentControl] = useState(postContentInfo.contentControl);
  const [postContentOpen, setPostContentOpen] = useState(false);

  const handleIconClick = () => {
    setPostContentOpen(!postContentOpen);
  };

  //댓글창이 먼저 나오지 않도록
  const setIsImgLoaded = useSetRecoilState(
    toggleValueAtom(`isImgLoaded${postContentInfo.id}`)
  );

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

  const isMyPost = (() => {
    if (userInfo.id === postContentInfo.userInfo.id) return true;
    else return false;
  })();

  return (
    <PostImgWrapper click={modalOpen} ref={postRef}>
      <PostImg
        src={postContentInfo.url}
        onLoad={() => updateImgLoadingStatus()}
        ref={postImgRef}
      />
      {isMyPost ? (
        <Link to={`/dashboard/profile/`}>
          <ProfileCp
            pfW={{ left: "20px", top: "15px", position: "absolute" }}
            pfIW={{
              width: "51px",
              height: "51px",
              margin: { r: "15" },
              border: "on",
            }}
            pfI={{
              width: "40px",
              height: "40px",
              zIndex: "4",
              basic: "50px",
            }}
            pfN={{
              backC: "black",
              color: "#f7dd07",
              fontS: "13px",
              borderRadius: "10px",
              height: "30px",
              padding: { t: "5", r: "5", b: "5", l: "5" },
            }}
            pfInfo={postContentInfo.userInfo}
          />
        </Link>
      ) : (
        <Link
          to={`/dashboard/profile/${postContentInfo.userInfo.nickname}/${userId}`}
        >
          <ProfileCp
            pfW={{ left: "20px", top: "15px", position: "absolute" }}
            pfIW={{
              width: "51px",
              height: "51px",
              margin: { r: "15" },
              border: "on",
            }}
            pfI={{
              width: "40px",
              height: "40px",
              zIndex: "4",
              basic: "50px",
            }}
            pfN={{
              backC: "black",
              color: "#f7dd07",
              fontS: "13px",
              borderRadius: "10px",
              height: "30px",
              padding: { t: "5", r: "5", b: "5", l: "5" },
            }}
            pfInfo={postContentInfo.userInfo}
          />
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
