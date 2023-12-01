import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

//Styled-Component
import {
  PostInfoWrapper,
  IconWrapper,
  CountNumber,
} from "../../StyledComponents/PostStyle/PostInfoStyle";

import {
  CommentIcon,
  MoreIcon,
  LikeIcon,
  LikeFillIcon,
  NotCommentIcon,
} from "../../StyledComponents/HomeStyle/Section2/Icon";

//Atoms
import ModalOpenAtom from "../../store/ModalOpenAtom";
import stateUpdateAtom from "../../store/stateUpdateAtom";
import userInfoAtom from "../../store/userState/userAtom";

const PostInfoCp = ({ postInfo }) => {
  const userInfo = useRecoilValue(userInfoAtom);
  const [postCountInfo, setPostCountInfo] = useState({});

  //댓글 업데이트 알림 atom
  const commentCountUpdate = useRecoilValue(
    stateUpdateAtom(`comment${postInfo.id}`)
  );

  //게시물 댓글 기능 해제 여부
  const [postCommentControl, setPostCommentControl] = useState(
    postInfo.commentControl
  );
  //게시물 좋아요 기능 해제 여부
  const [postLikeControl, setPostLikeControl] = useState(
    postInfo.likeCountControl
  );
  const [click, setClick] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postInfo.id}`)
  );

  //게시물 좋아요 여부
  const [likeCheck, setLikeCheck] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  //게시물에 좋아요를 눌렀는지 알려주는 함수

  const handleSubmitLike = async () => {
    try {
      await axios.post(`/post/like/${postInfo.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUnLike = async () => {
    try {
      await axios.post(`/post/unlike/${postInfo.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  //postInfo fetch 함수
  const fetchPostInfo = async () => {
    try {
      const response = await axios.get(
        `page/render-only-post-info/${postInfo.id}`
      );
      return response;
      /*
      response.data.postLikeCount.forEach((info) => {
        if (info.id === userInfo.id) {
          setLikeCheck(true);
        }
      });
      setPostCountInfo({ ...response.data });*/
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    processPostInfoData();
  }, [commentCountUpdate]);

  const processPostInfoData = async () => {
    const postInfoDataResponse = await fetchPostInfo();
    postInfoDataResponse.data.postLikeCount.forEach((info) => {
      if (info.id === userInfo.id) {
        setLikeCheck(true);
      }
    });
    setPostCountInfo({ ...postInfoDataResponse.data });
  };

  const handleUnLike = () => {
    handleSubmitUnLike();
    setLikeCheck(false);
    setPostCountInfo((prev) => ({
      ...prev,
      postLikeCount: {
        ...prev.postLikeCount,
        length: prev.postLikeCount.length - 1,
      },
    }));
  };

  const handleLike = () => {
    handleSubmitLike();
    setLikeCheck(true);
    setPostCountInfo((prev) => ({
      ...prev,
      postLikeCount: {
        ...prev.postLikeCount,
        length: prev.postLikeCount.length + 1,
      },
    }));
  };

  if (Object.keys(postCountInfo).length >= 1) {
    return (
      <PostInfoWrapper click={click}>
        <IconWrapper>
          {postCommentControl ? (
            <CommentIcon
              onClick={() => {
                handleClick();
              }}
            />
          ) : (
            <NotCommentIcon />
          )}
          {postCommentControl && (
            <CountNumber>{postCountInfo.commentCount.length}</CountNumber>
          )}
        </IconWrapper>
        {likeCheck ? (
          <IconWrapper
            onClick={() => {
              handleUnLike();
            }}
          >
            <LikeFillIcon />
            <CountNumber>{postCountInfo.postLikeCount.length}</CountNumber>
          </IconWrapper>
        ) : (
          <IconWrapper
            onClick={() => {
              handleLike();
            }}
          >
            <LikeIcon />
            <CountNumber>{postCountInfo.postLikeCount.length}</CountNumber>
          </IconWrapper>
        )}
        <IconWrapper>
          <MoreIcon />
        </IconWrapper>
      </PostInfoWrapper>
    );
  }
};

export default PostInfoCp;
