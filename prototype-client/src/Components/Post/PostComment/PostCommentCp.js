import React, { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
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
  MoreReplyButtonWrapper,
  MoreReplyButtonIcon,
  MoreReplyTitle,
} from "../../../StyledComponents/PostStyle/PostCommentCpSt";

//Component
import PostReplyComment from "../PostReplyComment/PostReplyComment";

//atoms
import ModalOpenAtom from "../../../store/ModalOpenAtom";
import stateUpdateAtom from "../../../store/stateUpdateAtom";
import PostCommentContactCp from "./PostCommentContactCp";
import PostReplyCommentInputCp from "../PostReplyComment/PostReplyCommentInputCp";
import { useUserInfoValue } from "../../../contextApi/UserInfoProvider";
import { useQuery } from "@tanstack/react-query";
import SpinnerCp from "../../Common/Spinner/SpinnerCp";

const PostCommentCp = ({ comment, myComment }) => {
  //const userInfo = useRecoilValue(userInfoAtom);
  const userInfo = useUserInfoValue();
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleCheck = () => {};

  const replyInputOpen = useRecoilValue(
    ModalOpenAtom(`replyComment${comment.id}`)
  );

  const [moreReplyOpen, setMoreReplyOpen] = useState(false);

  //댓글에 좋아요를 누른 사람의 명단을 담는 객체
  const [postCommentLikeInfo, setPostCommentLikeInfo] = useState({});
  const [postCommentLikeCount, setPostCommentLikeCount] = useState(0);

  const replyUpdate = useRecoilValue(stateUpdateAtom("postReply"));

  //postCommentConfigModal에서 댓글 삭제 시 댓글 업데이트
  const postCommentUpdate = useRecoilValue(stateUpdateAtom("postComment"));

  //좋아요를 누르거나 취소 했을때 댓글 좋아요 정보를 업데이트 해주는 함수
  const [postCommentInfoUpdate, setPostCommentInfoUpdate] = useRecoilState(
    stateUpdateAtom(`comment${comment.id}`)
  );

  const [commentLikeCheck, setCommentLikeCheck] = useState(false);

  const handlePostReplyComment = async () => {
    try {
      await axios.post("/comment/post", {
        content: reply,
        PostId: comment.PostId,
        PostCommentId: comment.id,
      });
    } catch (error) {
      console.log(`PostReplyComments Error ${error}`);
    }
  };

  //좋아요 버튼 함수
  const handleSubitCommentLike = async () => {
    try {
      const response = await axios.post(`/comment/post/like/${comment.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  //좋아요 버튼 취소 함수
  const handleSubmitCommentUnlike = async () => {
    try {
      const response = await axios.post(`/comment/post/unlike/${comment.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const getPostReplyComment = async () => {
    try {
      const response = await axios.get(
        `/page/render-post-replycomment/${comment.id}`
      );
      return response;
    } catch (error) {}
  };
  /*
  useEffect(() => {
    const fetchReplyComments = async () => {
      try {
        const response = await axios.get(
          `/page/render-post-replycomment/${comment.id}`
        );

        setReplies(response.data);
      } catch (error) {}
    };

    fetchReplyComments();
  }, [replyUpdate, postCommentUpdate]);*/

  //++!!

  const { data, isLoading } = useQuery({
    queryKey: [`postReplyComments-${comment.id}`],
    queryFn: getPostReplyComment,
  });
  //++!!

  //댓글 좋아요 정보를 불러오는 함수 (api 폴더에서 따로 관리 할 예정)
  const fetchPostCommentInfo = async () => {
    try {
      const response = await axios.get(`
      /page/render-only-postcomment-likeinfo/${comment.id}
      `);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  //const processPostCommentInfoData = async () => {
  // const postCommentInfoDataResponse = await fetchPostCommentInfo();
  /*
    postCommentInfoDataResponse.data.postCommentLikeCount.forEach((info) => {
      if (info.id === userInfo.id) {
        setCommentLikeCheck(true);
      }
    });*/
  //setPostCommentLikeInfo({ ...postCommentInfoDataResponse.data });
  //};

  //++!!

  const commentLikeInfo = useQuery({
    queryKey: [`postCommentLikeInfo${comment.id}`],
    queryFn: fetchPostCommentInfo,
    /*
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,*/
  });

  useEffect(() => {
    if (commentLikeInfo.data) {
      setPostCommentLikeCount(
        commentLikeInfo.data.data.postCommentLikeCount.length
      );
      setCommentLikeCheck(commentLikeInfo.data.data.likeCheck);
    }
  }, [commentLikeInfo.data]);
  //++--

  const handleCommentLike = () => {
    setCommentLikeCheck(true);
    setPostCommentLikeCount((prev) => prev + 1);
    handleSubitCommentLike();
  };

  const handleCommentUnlike = () => {
    setCommentLikeCheck(false);
    setPostCommentLikeCount((prev) => prev - 1);
    handleSubmitCommentUnlike();
  };

  /*
  useEffect(() => {

    if (commentLikeInfo.data) {
      commentLikeInfo.data.data.postCommentLikeCount.forEach((info) => {
        if (info.id === userInfo.id) {
          setCommentLikeCheck(true);
        }
      });
      setPostCommentLikeInfo({ ...commentLikeInfo.data.data });
      setLoading(true);
    }
  }, [commentLikeInfo]);*/

  //postCommentUpdate

  //++--
  if (isLoading || commentLikeInfo.isLoading) {
    return (
      <SpinnerWrapper>
        <SpinnerCp color="black" size="30px" />
      </SpinnerWrapper>
    );
  }

  return (
    <CommentWrapper2>
      <CommentProfileWrapper>
        <CommentProfileImg src={comment.User.profileImg} />
        <CommentProfileInfo>
          <CommentUserNicknameWrapper>
            <CommentUserNickname>{comment.User.nickname}</CommentUserNickname>
            <LikeButtonWrapper>
              {commentLikeCheck ? (
                <CommentLikeFillIcon
                  onClick={() => {
                    handleCommentUnlike();
                  }}
                />
              ) : (
                <CommentLikeIcon
                  onClick={() => {
                    handleCommentLike();
                  }}
                />
              )}
            </LikeButtonWrapper>
          </CommentUserNicknameWrapper>
          <CommentContent>{comment.content}</CommentContent>
          <PostCommentContactCp
            myComment={myComment}
            comment={comment}
            postCommentLikeCount={postCommentLikeCount}
          />
          {replyInputOpen && <PostReplyCommentInputCp comment={comment} />}
          {data.data.length > 0 && (
            <MoreReplyButtonWrapper
              onClick={() => setMoreReplyOpen(!moreReplyOpen)}
            >
              <MoreReplyButtonIcon moreReplyOpen={moreReplyOpen} />
              <MoreReplyTitle>댓글</MoreReplyTitle>
            </MoreReplyButtonWrapper>
          )}
          {moreReplyOpen && (
            <>
              {data.data.map((infoState) => (
                <PostReplyComment comment={infoState} commentId={comment.id} />
              ))}
            </>
          )}
        </CommentProfileInfo>
      </CommentProfileWrapper>
    </CommentWrapper2>
  );
};

export default PostCommentCp;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
