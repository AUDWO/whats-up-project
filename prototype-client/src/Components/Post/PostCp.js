import { useRecoilValue } from "recoil";

//Styled-Components
import {
  PostWrapper,
  PostDivWrapper,
} from "../../StyledComponents/PostStyle/PostCpStyle";

//Components
import PostInfoCp from "./PostInfoCp";
import PostContentCp from "./PostContentCp";
//import CommentModalCp from "./PostComment/PostCommentsCp";

//Atom
import toggleValueAtom from "../../store/ToggleValueAtom";
import { Suspense, lazy, useEffect } from "react";
import axios from "axios";

const CommentModalCp = lazy(() => import("./PostComment/PostCommentsCp"));

const PostCp = ({ post, blurhashedImg }) => {
  const postContentInfo = {
    url: post.img,
    title: post.title,
    content: post.content,
    contentControl: post.contentControl,
    id: post.id,
    userInfo: post.User,
    hash: blurhashedImg,
  };

  const postInfo = {
    id: post.id,
    likeControl: post.likeControl,
    commentControl: post.commentControl,
  };

  console.log(blurhashedImg, "blur blur lbur");

  const isImgLoaded = useRecoilValue(toggleValueAtom(`isImgLoaded${post.id}`));

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`/page/blur/${post.id}`);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <PostDivWrapper>
      <PostWrapper>
        <PostContentCp postContentInfo={postContentInfo} userId={post.UserId} />
        <Suspense fallback={<div>Loading...</div>}>
          <CommentModalCp postId={post.id} />
        </Suspense>
        {isImgLoaded && <PostInfoCp postInfo={postInfo} />}
      </PostWrapper>
    </PostDivWrapper>
  );
};

export default PostCp;

//

/*
<Suspense fallback={<div>Loading...</div>}>
<CommentModalCp postId={post.id} />
</Suspense>
*/
