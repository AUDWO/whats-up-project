const express = require("express");
const { isLoggedIn } = require("../middlewares");
const {
  deletePost,
  deleteDiary,
  unReactStory,
  unReactDiary,
  deleteStoryComment,
  deleteDiaryComment,
  deletePostComment,
} = require("../controllers/delete");
const { unLikePost } = require("../controllers/post");
const { unfollow } = require("../controllers/user");
const { postCommenUntLike } = require("../controllers/postComment");
const router = express.Router();

//Delete Content
router.delete("/post/:postId", isLoggedIn, deletePost);
router.delete("/diary/:diaryId", isLoggedIn, deleteDiary);

//Delete Content Comment
router.delete("/post-comment/:commentId", isLoggedIn, deletePostComment);
router.delete("/diary-comment/:commentId", isLoggedIn, deleteDiaryComment);
router.delete("/story-comment/:commentId", isLoggedIn, deleteStoryComment);

//Delete Like || React
router.delete("post-unlike/:postId", isLoggedIn, unLikePost);
router.delete("/diary-unreact/:diaryId", isLoggedIn, unReactDiary);
router.delete("/story-unreact/:storyId", isLoggedIn, unReactStory);

//Delete PostComment Like
router.delete("/post-comment-unlike/:commentId", isLoggedIn, postCommenUntLike);

//Delete User follow
router.delete("/unfollow-user/:userId", isLoggedIn, unfollow);
