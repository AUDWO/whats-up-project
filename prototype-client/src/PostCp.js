import React, { Suspense } from "react";

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
import { UserInfoProvider } from "./contextApi/UserInfoProvider";

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
    likeControl: post.likeControl,
    commentControl: post.commentControl,
  };

  const isImgLoaded = useRecoilValue(toggleValueAtom(`isImgLoaded${post.id}`));

  return (
    <PostDivWrapper>
      <PostWrapper>
        <UserInfoProvider>
          <PostContentCp postContent={postContent} userId={post.UserId} />
          {isImgLoaded && <CommentModalCp postId={post.id} />}
          {isImgLoaded && <PostInfoCp postInfo={postInfo} />}
        </UserInfoProvider>
      </PostWrapper>
    </PostDivWrapper>
  );
};

export default PostCp;

const P = styled.div`
  background-color: blue;
  width: 30px;
  height: 50px;
`;
