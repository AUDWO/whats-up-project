import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

//Styled-Component
import {
  PostInfoWrapper,
  IconWrapper,
  CountNumber,
} from "../../StyledComponents/PostStyle/PostInfoStyle";

import {
  CommentIcon,
  LikeIcon,
  LikeFillIcon,
  NoCommentIcon,
  NoLikeIcon,
} from "../../StyledComponents/HomeStyle/Section2/Icon";

//Atoms
import ModalOpenAtom from "../../store/ModalOpenAtom";

//useMutation hook
import CustomUseMutation from "../../customHooks/CustomUseMutation";

//Custom hook
import UserInfoQuery from "../../customHooks/userInfoQuery";

const PostInfoCp = ({ postInfo }) => {
  const postInfoId = postInfo.id;
  const userInfo = UserInfoQuery();

  const [postLikeCount, setPostLikeCount] = useState(0);
  const [postCommentCount, setPostCommentCount] = useState(0);

  //게시물 댓글 기능 해제 여부
  const [postCommentControl] = useState(postInfo.commentControl);
  //게시물 좋아요 기능 해제 여부
  const [postLikeControl] = useState(postInfo.likeControl);

  const [commentModalOpen, setCommentModalOpen] = useRecoilState(
    ModalOpenAtom(`commentModalOpen${postInfoId}`)
  );

  //게시물 좋아요 여부
  const [likeCheck, setLikeCheck] = useState(false);

  const handleOpenClick = () => {
    setCommentModalOpen(!commentModalOpen);
  };

  const postLike = async () => {
    try {
      return await axios.post(`/post/like/${postInfo.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const postUnLike = async () => {
    try {
      return await axios.post(`/post/unlike/${postInfo.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: handlePostUnLike } = CustomUseMutation(postUnLike, [
    `postInfo-${postInfoId}`,
  ]);

  const { mutate: handlePostLike } = CustomUseMutation(postLike, [
    `postInfo-${postInfoId}`,
  ]);

  //postInfo fetch 함수 (api 폴더에서 따로 관리 할 예정)
  const fetchPostInfo = async () => {
    try {
      const response = await axios.get(
        `page/render-only-post-info/${postInfoId}`
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  //-----------------------------

  const { data, isLoading } = useQuery({
    queryKey: [`postInfo-${postInfo.id}`],
    queryFn: fetchPostInfo,
  });

  const checkedLike = (() => {
    let checkingLike = false;
    if (data?.data) {
      data.data.postLikeCount.forEach((info) => {
        if (info.id === userInfo.id) {
          checkingLike = true;
        }
      });
    }
    return checkingLike;
  })();

  useEffect(() => {
    setLikeCheck(checkedLike);
    setPostCommentCount(data?.data.commentCount.length);
    setPostLikeCount(data?.data.postLikeCount.length);
  }, [data?.data]);

  //------------------------------

  const handleUnLike = () => {
    setLikeCheck(false);
    setPostLikeCount((prev) => prev - 1);
    handlePostUnLike();
  };

  const handleLike = () => {
    setLikeCheck(true);
    setPostLikeCount((prev) => prev + 1);
    handlePostLike();
  };

  if (isLoading) {
    return (
      <FakePostInfoWrapper>
        <FakePostInfo>.</FakePostInfo>
        <FakePostInfo>.</FakePostInfo>
      </FakePostInfoWrapper>
    );
  }

  return (
    <PostInfoWrapper click={commentModalOpen}>
      <IconWrapper>
        {postCommentControl ? (
          <CommentIcon
            onClick={() => {
              handleOpenClick();
            }}
          />
        ) : (
          <NoCommentIcon />
        )}
        {postCommentControl && <CountNumber>{postCommentCount}</CountNumber>}
      </IconWrapper>
      <IconWrapper>
        {postLikeControl ? (
          likeCheck ? (
            <LikeFillIcon
              onClick={() => {
                handleUnLike();
              }}
            />
          ) : (
            <LikeIcon
              onClick={() => {
                handleLike();
              }}
            />
          )
        ) : (
          <NoLikeIcon />
        )}
        {postLikeControl && <CountNumber>{postLikeCount}</CountNumber>}
      </IconWrapper>
    </PostInfoWrapper>
  );
};

export default PostInfoCp;

const FakePostInfo = styled.div`
  width: 40px;
  height: 30px;
  background-color: gray;
  opacity: 0.1;
  margin-bottom: 35px;
  margin-top: 10px;
`;

const FakePostInfoWrapper = styled.div`
  width: 90px;
  margin-top: 25px;
`;
