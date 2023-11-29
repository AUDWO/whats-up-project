import React, { Suspense, isValidElement } from "react";

import styled from "styled-components";

//Styled-Components
import {
  PostWrapper,
  PostDivWrapper,
} from "./StyledComponents/PostStyle/PostCpStyle";

//Components
import PostInfoCp from "./Components/Post/PostInfoCp";
import PostContentCp from "./Components/Post/PostContentCp";

import CommentModalCp from "./Components/Post/PostComment/PostCommentsCp";
import { useRecoilValue } from "recoil";
import toggleValueAtom from "./store/ToggleValueAtom";

const PostCp = ({ post }) => {
  const postContent = {
    url: post.img,
    title: post.title,
    content: post.content,
    contentControl: post.contentControl,
    id: post.id,
  };

  const postInfo = {
    id: post.id,
    likeCountControl: post.likeCountControl,
    commentControl: post.commentControl,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    likeCheck: post.likeCheck,
  };
  console.log("post.img");
  console.log(post.img);
  console.log("post.img");

  const isImgLoaded = useRecoilValue(toggleValueAtom("isImgLoaded"));

  console.log("isImgLoaded");
  console.log(isImgLoaded);
  console.log("isImgLoaded");

  return (
    <PostDivWrapper>
      <PostWrapper>
        <PostContentCp postContent={postContent} userId={post.UserId} />
        {isImgLoaded && <CommentModalCp postId={post.id} />}
        <PostInfoCp postInfo={postInfo} />
      </PostWrapper>
    </PostDivWrapper>
  );
};

export default PostCp;
