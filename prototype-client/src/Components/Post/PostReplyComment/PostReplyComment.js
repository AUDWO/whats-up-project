import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import styled from "styled-components";

//Styled-Components
import {
  CommentWrapper2,
  CommentProfileWrapper,
  CommentProfileImg,
  CommentProfileInfo,
  CommentUserNicknameWrapper,
  CommentUserNickname,
  LikeButtonWrapper,
  CommentLikeFillIcon,
  CommentLikeIcon,
  CommentContent,
  CommentContactWrapper,
  CommentLikeCount,
  CommentConfigIcon,
} from "../../../StyledComponents/PostStyle/PostReplyComment/PostReplyCommentCpSt";

//component
import CommentConfigModalCp from "../../Common/CommentConfigModal/CommentConfigModalCp";

//atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import { useQuery } from "@tanstack/react-query";

//useMutation hook
import CustomUseMutation from "../../../customHooks/CustomUseMutation";

const PostReplyComment = ({ replyComment, commentId }) => {
  const [replyCommentLikeCount, setReplyCommentLikeCount] = useState(0);
  const [replyCommentLikeCheck, setReplyCommentLikeCheck] = useState(false);

  const fetchPostReplyCommentLikeInfo = async () => {
    try {
      //postCommentLikeInfo Update
      return await axios.get(`
        /page/render-only-postcomment-likeinfo/${replyComment.id}
        `);
    } catch (error) {
      console.error(error);
    }
  };

  const { data: replyCommentLikeCountInfo, isLoading } = useQuery({
    queryKey: [`replyComments-${replyComment.id}`],
    queryFn: fetchPostReplyCommentLikeInfo,
  });

  useEffect(() => {
    setReplyCommentLikeCount(
      replyCommentLikeCountInfo?.data.postCommentLikeCount.length
    );
    setReplyCommentLikeCheck(replyCommentLikeCountInfo?.data.likeCheck);
  }, [replyCommentLikeCountInfo?.data]);

  const [postReplyCommentConfigModalOpen, setPostReplyCommentConfigModalOpen] =
    useRecoilState(ModalOpenAtom(`postCommentConfigModal${replyComment.id}`));

  //댓글 좋아요를 눌렀는지 확인해주는 함수

  const postLike = async () => {
    try {
      return await axios.post(`/comment/post/like/${replyComment.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const postUnLike = async () => {
    try {
      return await axios.post(`/comment/post/unlike/${replyComment.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const { mutate: handlePostLike, isLoading: likeLoading } = CustomUseMutation(
    postLike,
    [`postReplyComments-${commentId}`]
  );

  const { mutate: handlePostUnLike, isLoading: unLikeLoading } =
    CustomUseMutation(postUnLike, [`postReplyComments-${commentId}`]);

  const handleLike = () => {
    setReplyCommentLikeCount((prev) => prev + 1);
    setReplyCommentLikeCheck(true);
    handlePostLike();
  };
  const handleUnLike = () => {
    setReplyCommentLikeCount((prev) => prev - 1);
    setReplyCommentLikeCheck(false);
    handlePostUnLike();
  };

  const offset = useMemo(() => {
    return { bottom: "-10px", right: "-10px" };
  }, []);

  if (isLoading || likeLoading || unLikeLoading) {
    return (
      <CommentWrapper2 index={1}>
        <CommentProfileWrapper>
          <FakeCommentProfileImg />
          <CommentProfileInfo>
            <CommentUserNicknameWrapper>
              <FakeCommentUserNickname />
            </CommentUserNicknameWrapper>
            <CommentContent>
              <FakeCommentUserNickname2 />
            </CommentContent>
            <CommentContactWrapper>
              <FakeCommentUserNickname />
            </CommentContactWrapper>
          </CommentProfileInfo>
        </CommentProfileWrapper>
      </CommentWrapper2>
    );
  }

  return (
    <CommentWrapper2 index={1}>
      <CommentProfileWrapper>
        <CommentProfileImg />
        <CommentProfileInfo>
          <CommentUserNicknameWrapper>
            <CommentUserNickname>
              {replyComment.User.nickname}
            </CommentUserNickname>
            <LikeButtonWrapper>
              {replyCommentLikeCheck ? (
                <CommentLikeFillIcon
                  onClick={() => {
                    handleUnLike();
                  }}
                />
              ) : (
                <CommentLikeIcon
                  onClick={() => {
                    handleLike();
                  }}
                />
              )}
            </LikeButtonWrapper>
          </CommentUserNicknameWrapper>
          <CommentContent>{replyComment.content}</CommentContent>
          <CommentContactWrapper>
            <CommentLikeCount>좋아요 {replyCommentLikeCount}</CommentLikeCount>
            <>
              <CommentConfigIcon
                onClick={() => {
                  setTimeout(() => {
                    setPostReplyCommentConfigModalOpen(true);
                  }, 0);
                }}
              />
              {postReplyCommentConfigModalOpen && (
                <CommentConfigModalCp
                  contentType={"post"}
                  commentId={replyComment.id}
                  commentIdOfReplyComment={commentId}
                  commentType={"replyComment"}
                  offset={offset}
                />
              )}
            </>
          </CommentContactWrapper>
        </CommentProfileInfo>
      </CommentProfileWrapper>
    </CommentWrapper2>
  );
};

export default PostReplyComment;

export const FakeCommentProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: gray;
  opacity: 0.4;
  margin-right: 15px;
`;

export const FakeCommentUserNickname = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
  background-color: gray;
  opacity: 0.4;
  width: 87px;
  height: 15px;
`;

export const FakeCommentUserNickname2 = styled.div`
  font-size: 13px;
  background-color: gray;
  opacity: 0.4;
  width: 77px;
  height: 15px;
`;
