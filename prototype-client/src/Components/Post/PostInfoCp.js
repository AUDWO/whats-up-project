import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";

//custom hook
import useOnlyByDepsEffect from "../../customHooks/useOnlyByDepsEffect";

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
  const commentCountUpdate = useRecoilValue(stateUpdateAtom("comment"));
  //게시물 좋아요 업데이트 알림 atom
  const [likeCountUpdate, setLikeCountUpdate] = useRecoilState(
    stateUpdateAtom(`postInfo${postInfo.id}`)
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

  const handleClick = () => {
    setClick(!click);
  };

  //게시물에 좋아요를 눌렀는지 알려주는 함수
  const handleLikeCheck = () => {
    let check = false;
    postCountInfo.postLikeCount.forEach((info) => {
      if (info.id === userInfo.id) {
        check = true;
      }
    });
    return check;
  };

  const [likeCheck, setLikeCheck] = useState("");

  const handleSubmitLike = async () => {
    try {
      const response = await axios.post(`/post/like/${postInfo.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUnLike = async () => {
    try {
      const response = await axios.post(`/post/unlike/${postInfo.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await axios.get(
          `page/render-only-post-info/${postInfo.id}`
        );

        setPostCountInfo({ ...response.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostInfo();

    if (Object.keys(postCountInfo).length > 1) {
      setLikeCheck(handleLikeCheck());
    }

    return () => {
      if (likeCheck) {
        handleSubmitLike();
      }
      if (!likeCheck) {
        handleSubmitUnLike();
      }
    };
  }, [commentCountUpdate]);

  const handleUnLike = () => {
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
    setLikeCheck(true);
    setPostCountInfo((prev) => ({
      ...prev,
      postLikeCount: {
        ...prev.postLikeCount,
        length: prev.postLikeCount.length + 1,
      },
    }));
  };

  console.log("likeCheck");
  console.log(likeCheck);
  console.log("likeCheck");

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
