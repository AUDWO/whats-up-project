import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import axios from "axios";

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

const PostContentCp = ({ postContent, userId }) => {
  const [modalOpen, setModalOpen] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postContent.id}`)
  );
  const [postContentControl, setPostContent] = useState(
    postContent.contentControl
  );
  const [postContentOpen, setPostContentOpen] = useState(false);

  //const userInfo = useRecoilValue(userInfoAtom);
  const userInfo = useUserInfoValue();
  const [postUserInfo, setPostUserInfo] = useState({});
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const handleIconClick = () => {
    setPostContentOpen(!postContentOpen);
  };

  //댓글창이 먼저 나오지 않도록
  const setIsImgLoaded = useSetRecoilState(
    toggleValueAtom(`isImgLoaded${postContent.id}`)
  );
  const postImgRef = useRef(null);

  const postRef = useRef(null);

  useEffect(() => {
    const FindUerById = async (id) => {
      const response = await axios.get(`/user/${id}`);
      setPostUserInfo({ ...response.data });
      setFetchSuccess(true);
    };

    FindUerById(userId);
    return () => {
      setModalOpen(false);
      setIsImgLoaded(false);
    };
  }, []);

  const updateImgLoadingStatus = () => {
    setIsImgLoaded(true);
  };

  if (fetchSuccess) {
    return (
      <PostImgWrapper click={modalOpen} ref={postRef}>
        <PostImg
          src={postContent.url}
          onLoad={() => updateImgLoadingStatus()}
          ref={postImgRef}
        />
        {userInfo.id === postUserInfo.id ? (
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
              pfInfo={postUserInfo}
            />
          </Link>
        ) : (
          <Link to={`/dashboard/profile/${postUserInfo.nickname}/${userId}`}>
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
              pfInfo={postUserInfo}
            />
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
