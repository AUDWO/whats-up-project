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

  const [likeCheck, setLikeCheck] = useState("");

  const handleSubmitLike = async () => {
    try {
      console.log("handleSubmitLike");
      const response = await axios.post(`/post/like/${postInfo.id}`);
      console.log("response");
      console.log(response);
      console.log("response");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUnLike = async () => {
    try {
      console.log("handleSubmitUnLike");
      const response = await axios.post(`/post/unlike/${postInfo.id}`);
      console.log("response");
      console.log(response);
      console.log("response");
    } catch (error) {
      console.error(error);
    }
  };

  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await axios.get(
          `page/render-only-post-info/${postInfo.id}`
        );
        const check = response.data.postLikeCount.forEach((info) => {
          if (info.id === userInfo.id) {
            return true;
          } else {
            return false;
          }
        });
        console.log("check");
        console.log(check);
        console.log("check");
        setLikeCheck(check);
        setPostCountInfo({ ...response.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostInfo();
  }, [commentCountUpdate]);

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
