const express = require("express");
const {
  renderUserInfo,
  checkUserEmail,
  checkUserNickname,
  renderStory,
  renderDiaries,
  renderOnlyPostInfo,
  renderOnlyPost,
  renderPostsComments,
  renderStoryComments,
  renderDiaryComments,
  renderDiaryReplyComments,
  renderPostReplyComments,
  renderStoryReplyComments,
  renderOnlyPostCommentLikeInfo,
  renderDiaryReact,
  renderStoryReact,
} = require("../controllers/page");
const {
  renderFollowInfo,
  checkFollower,
  findUserById,
} = require("../controllers/user");
const router = express.Router();

//Sign Up
router.get("/user-email-check/:email", checkUserEmail);
router.get("/user-nickname-check/:nickname", checkUserNickname);

//User
router.get("/user-info", renderUserInfo);
router.get("/follower/:userId", renderFollowInfo);
router.get("/check-follower/:userId", checkFollower);
router.get("/user/:userId", findUserById);

//get all Contents
router.get("/all-post/", renderPosts);
router.get("/all-diary", renderDiaries);
router.get("/all-story", renderStory);

//get User Contents
router.get("/user-all-post/:userId", renderPosts);
router.get("/user-all-diary/:userId", renderDiaries);

//get only Content
router.get("/only-post/:postId", renderOnlyPost);
router.get("/only-diary/:diaryId", renderOnlyPost);
router.get("/only-story/:storyId", renderOnlyPost);

//get Content only CommentInfo
router.get(
  "/only-post-comment-likeinfo/:commentId",
  renderOnlyPostCommentLikeInfo
);

//get Content Comments
router.get("post-comments/:postId", renderPostsComments);
router.get("diary-comments/:diaryId", renderDiaryComments);
router.get("story-comments/:storyId", renderStoryComments);

//get Content Info
router.get("post-info/:postId", renderOnlyPostInfo);
router.get("diary-react-info/:diaryId", renderDiaryReact);
router.get("story-react-info/:storyId", renderStoryReact);

//get Content ReplyComments
router.get("post-reply-comments/:postId", renderPostReplyComments);
router.get("diary-reply-comments/:diaryId", renderDiaryReplyComments);
router.get("story-reply-comments", renderStoryReplyComments);
