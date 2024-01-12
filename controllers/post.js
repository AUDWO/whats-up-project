const Post = require("../models/post");
const Story = require("../models/story");
const Diary = require("../models/diary");
const ContactStory = require("../models/contactStory");
const ContactDiary = require("../models/contactDiary");

exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  const originalUrl = req.file.location;
  //const url = originalUrl.replace(/\/original\//, "/thumb/");
  //const url = originalUrl;
  const url = originalUrl;
  res.json({ url, originalUrl });
};

exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
      title: req.body.title,
      likeControl: req.body.likeControl,
      likeCount: req.body.likeCount,
      commentControl: req.body.commentControl,
      commentCount: req.body.commentCount,
      contentControl: req.body.contentControl,
    });

    res.status(200).send("Post successful");
  } catch (error) {
    console.error(error);
  }
};

exports.likePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({
      where: { id: postId },
    });
    await post.addUser(req.user.id);
    res.status(200).send("success");
  } catch (error) {}
};

exports.unLikePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findOne({
      where: { id: postId },
    });
    await post.removeUser(req.user.id);
    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.uploadStory = async (req, res, next) => {
  try {
    const story = await Story.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });

    res.status(200).send("Post successful");
  } catch (error) {
    console.error(error);
  }
};

exports.reactStory = async (req, res) => {
  try {
    const response = await ContactStory.create({
      type: req.body.type,
      reacter: req.user.id,
      responseStoryId: req.params.storyId,
    });

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};

exports.uploadDiary = async (req, res, next) => {
  try {
    const diary = await Diary.create({
      title: req.body.title,
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
      commentControl: req.body.commentControl,
      likeControl: req.body.likeControl,
      publicControl: req.body.publicControl,
    });

    res.status(200).send("Post successful");
  } catch (error) {
    console.error(error);
  }
};

exports.reactDiary = async (req, res) => {
  try {
    const response = await ContactDiary.create({
      type: req.body.type,
      reacter: req.user.id,
      responseDiaryId: req.params.diaryId,
    });

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
  }
};
