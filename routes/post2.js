const express = require("express");
const router = express.Router();
const fs = require("fs");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  afterUploadImage,
  uploadDiary,
  uploadStory,
  likePost,
  unLikePost,
  reactDiary,
  reactStory,
} = require("../controllers/post");
const {
  postPostsComment,
  postDiaryComment,
  postStoryComment,
  postCommentLike,
} = require("../controllers/postComment");
const { login, join } = require("../controllers/auth");

try {
  fs.readdirSync("uploads");
} catch (error) {
  fs.mkdirSync("uploads");
}

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "whatsup1",
    key(req, file, cb) {
      cb(null, `original/${Date.now()}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});

const upload2 = multer();

//login logout signup
router.post("/sign-up", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);
router.post("/logout", isLoggedIn, logout);

//post User follow
router.post("/follow-user/:userId", isLoggedIn, follow);

//post Content
router.post("/post", isLoggedIn, upload2.none(), uploadPost);
router.post("/diary", isLoggedIn, upload2.none(), uploadStory);
router.post("/story", isLoggedIn, upload2.none(), uploadDiary);

//post Content Img
router.post("upload-img/", isLoggedIn, afterUploadImage);

//post Content like || react
router.post("/post-like/:postId", isLoggedIn, likePost);
//router.post("/post-unlike/:postId", isLoggedIn, unLikePost);
router.post("/diary-react/:diaryId", isLoggedIn, reactDiary);
router.post("/story-react/:storyId", isLoggedIn, reactStory);

// post Content Comment || ReplyComment
router.post("/post-comment", isLoggedIn, postPostsComment);
router.post("/diary-comment", isLoggedIn, postDiaryComment);
router.post("/story-comment", postStoryComment);

// post Content(only Post) Comment like
router.post("/post-comment-like/:commentId", isLoggedIn, postCommentLike);
