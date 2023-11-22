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
  const [postCountInfo, setPostCountInfo] = useState({});

  const commentCountUpdate = useRecoilValue(stateUpdateAtom("comment"));
  const userInfo = useRecoilValue(userInfoAtom);
  //게시물 댓글 기능 해제 여부
  const [postComment, setPostComment] = useState(postInfo.commentControl);
  //게시물 좋아요 기능 해제 여부
  const [postInfoUpdate, setPostInfoUpdate] = useRecoilState(
    stateUpdateAtom(`postInfo${postInfo.ID}`)
  );
  const [click, setClick] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postInfo.id}`)
  );

  const handleClick = () => {
    setClick(!click);
  };

  const handleLikeCheck = () => {
    let check = false;
    postCountInfo.postLikeCount.forEach((info) => {
      if (info.id === userInfo.id) {
        check = true;
      }
    });
    return check;
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
  }, [postInfoUpdate, commentCountUpdate]);

  const handleLikePost = async () => {
    try {
      const response = await axios.post(`/post/like/${postInfo.id}`);
      setPostInfoUpdate(!postInfoUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnLikePost = async () => {
    try {
      const response = await axios.post(`/post/unlike/${postInfo.id}`);
      setPostInfoUpdate(!postInfoUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  if (Object.keys(postCountInfo).length >= 1) {
    return (
      <PostInfoWrapper click={click}>
        <IconWrapper>
          {postComment ? (
            <CommentIcon
              onClick={() => {
                handleClick();
              }}
            />
          ) : (
            <NotCommentIcon />
          )}
          {postComment && (
            <CountNumber>{postCountInfo.commentCount.length}</CountNumber>
          )}
        </IconWrapper>
        {handleLikeCheck() ? (
          <IconWrapper>
            <LikeFillIcon
              onClick={() => {
                handleUnLikePost();
              }}
            />
            <CountNumber>{postCountInfo.postLikeCount.length}</CountNumber>
          </IconWrapper>
        ) : (
          <IconWrapper
            onClick={() => {
              handleLikePost();
            }}
          >
            <LikeIcon onClick={() => {}} />
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
