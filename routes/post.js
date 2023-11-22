const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { isLoggedIn } = require("../middlewares/");
const {
  afterUploadImage,
  uploadPost,
  uploadStory,
  uploadDiary,
  likePost,
  unLikePost,
  reactStory,
  reactDiary,
} = require("../controllers/post");
const router = express.Router();
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");

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

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);
router.post("/", isLoggedIn, upload2.none(), uploadPost);
router.post("/like/:postId", likePost);
router.post("/unlike/:postId", unLikePost);

router.post("/storyimg", isLoggedIn, upload.single("img"), afterUploadImage);
router.post("/story", isLoggedIn, upload2.none(), uploadStory);
router.post("/story-react/:storyId", reactStory);

router.post("/diaryimg", isLoggedIn, upload.single("img"), afterUploadImage);
router.post("/diary", isLoggedIn, upload2.none(), uploadDiary);
router.post("/diary-react/:diaryId", reactDiary);
//router.post("/storyContact",)

router.post("/profile-img", isLoggedIn, upload.single("img"), afterUploadImage);

module.exports = router;
