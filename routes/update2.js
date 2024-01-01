const express = require("express");
const {
  updatePostLikeCount,
  updateDiaryReactInfo,
  updateUserInfo,
  updatePostInfo,
  updateDiaryInfo,
} = require("../controllers/update");
const { isLoggedIn } = require("../middlewares");
const { update } = require("../models/user");
const router = express.Router();

//Patch Content LikeCount || ReactCount
router.patch("/post/like-count-up", updatePostLikeCount);
router.patch("/diary/react-count-up", isLoggedIn, updateDiaryReactInfo);
router.patch("/story/react-count-up/:diaryId", isLoggedIn);

//Patch Content Info
router.patch("/post-info/:postId", isLoggedIn, updatePostInfo);
router.patch("/diary-info/:diaryId", isLoggedIn, updateDiaryInfo);

//Patch Content(only Post) Comment LikeCount
router.patch("/post/comment-like-count-up");

//Patch User
router.patch("/user-info", isLoggedIn, updateUserInfo);

module.exports = router;
