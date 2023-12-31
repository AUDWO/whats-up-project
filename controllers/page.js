const User = require("../models/user");
const Post = require("../models/post");
const Story = require("../models/story");
const Diary = require("../models/diary");
//서비스를 호출하는 코\\

const PostComment = require("../models/postComment");
const StoryComment = require("../models/storyComment");
const DiaryComment = require("../models/diaryComment");
const db = require("../models");
const ContactStory = require("../models/contactStory");
const ContactDiary = require("../models/contactDiary");
const { blurhashFromURL } = require("blurhash-from-url");

exports.renderUserInfo = async (req, res, next) => {
  const otherUserId = req.params.userId;

  if (otherUserId) {
    const user = await User.findOne({
      where: { id: otherUserId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followers",
        }, //팔로잉git
        {
          model: User,
          attributes: ["id", "nickname"],
          as: "Followings",
        }, //팔로워
      ],
    });

    const posts = await Post.findAll({
      where: {
        UserId: otherUserId,
      },
    });

    const diaries = await Diary.findAll({
      where: {
        UserId: otherUserId,
      },
    });

    res.send({
      id: user.dataValues.id,
      name: user.dataValues.name,
      img: user.dataValues.profileImg,
      createdAt: user.dataValues.createdAt,
      nickname: user.dataValues.nickname,
      email: user.dataValues.email,
      Followers: user.dataValues.Followers,
      Followings: user.dataValues.Followings,
      postslength: posts.length,
      diarieslength: diaries.length,
    });
  }
  if (!otherUserId) {
    const following = res.locals.followingCount;
    const follower = res.locals.followerCount;
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });

      const posts = await Post.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      const diaries = await Diary.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      res.send({
        id: user.dataValues.id,
        name: user.dataValues.name,
        profileImg: user.dataValues.profileImg,
        createdAt: user.dataValues.createdAt,
        nickname: user.dataValues.nickname,
        email: user.dataValues.email,
        follower,
        following,
        postslength: posts.length,
        diarieslength: diaries.length,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
};

exports.checkUserEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.params.email,
      },
    });

    if (!user) {
      res.send("allowEmail");
    }
    if (user) {
      res.send("disallowEmail");
    }
  } catch (error) {
    console.error(error);
  }
};

exports.checkUserNickname = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        nickname: req.params.nickname,
      },
    });

    if (!user) {
      res.send("allowNickname");
    }
    if (user) {
      res.send("disallowNickname");
    }
  } catch (error) {
    console.error(error);
  }
};

exports.renderAllPost = async (req, res, next) => {
  const { page, perPage } = req.query;
  const userId = req.params.userId;
  //const page = parseInt(sPage);
  //const perPage = parseInt(sPerPage);

  //마지막 페이지 체크를 위해서
  let lastPageCheck = false;

  if (userId) {
    try {
      const posts = await Post.findAll({
        where: {
          UserId: userId,
        },
        include: {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
        order: [["createdAt", "DESC"]],
      });

      res.send(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  if (!userId) {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
        order: [["createdAt", "DESC"]],
        offset: parseInt(page * perPage),
        limit: parseInt(perPage),
      });

      const getBlurhash = async (postImgUrl) => {
        const output = await blurhashFromURL(postImgUrl);
        return output;
      };

      const currentCount = posts.length;

      // 마지막으로 데이

      if (currentCount === 0) {
        const additionalPosts = await Post.findAll({
          include: {
            model: User,
            attributes: ["id", "nickname", "profileImg"],
          },
          order: [["createdAt", "DESC"]],
          offset: parseInt(page * perPage),
          limit: parseInt(parseInt(perPage) - currentCount),
        });

        //데이터의 총합이 5의 배수일때
        lastPageCheck = true;
        if (additionalPosts === 0) {
          return res.send({ lastPageCheck });
        }
        posts.push(...additionalPosts);
      }

      const blurhashedImgs = await Promise.all(
        posts.map(async (post) => {
          const blurhashedImg = await getBlurhash(post.img);
          return blurhashedImg.encoded;
        })
      );
      /*
      posts = await Promise.all(
        posts.map(async (post) => {
          const blurhashedImg = await getBlurhash(post.img);
          return { ...post, blurhashedImg };
        })
      );*/
      res.send({ posts, page, lastPageCheck, blurhashedImgs });
    } catch (err) {
      console.error(err, "getAllPosts - Error");
      next(err);
    }
  }
};

exports.renderOnlyPost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findAll({
      where: { id: postId },
    });
    async function getBlurhash() {
      const output = await blurhashFromURL(post[0].img);
      return output;
    }
    const aaa = await getBlurhash();

    res.send({ post, postImg: post[0].img, hash: aaa });
  } catch (error) {
    console.error(error);
  }
};

exports.renderOnlyPostInfo = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const postComment = await PostComment.findAll({
      where: { PostId: postId },
    });

    const post = await Post.findOne({
      where: { id: postId },
    });

    const postLike = await post.getUsers({ attributes: ["id"] });

    res.send({
      commentCount: postComment,
      postLikeCount: postLike,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.renderPostsComments = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const postComments = await PostComment.findAll({
      where: {
        PostId: postId,
        PostCommentId: null,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
        {
          model: Post,
          attributes: ["id"],
        },
      ],
    });

    const onlyInfoPostsComments = postComments.map(
      (comments) => comments.dataValues
    );
    res.send(onlyInfoPostsComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderPostReplyComments = async (req, res, next) => {
  const postCommentId = req.params.commentId;
  try {
    const replyComments = await PostComment.findAll({
      where: { PostCommentId: postCommentId },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });
    const onlyInfoPostReplyComments = replyComments.map(
      (comment) => comment.dataValues
    );

    res.send(onlyInfoPostReplyComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderOnlyComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await PostComment.findAll({
      where: { id: commentId },
      include: {
        model: User,
        attributes: ["id", "nickname"],
      },
    });

    res.send(comment);
  } catch (error) {
    console.error(error);
  }
};

exports.renderOnlyPostCommentLikeInfo = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const postComment = await PostComment.findOne({
      where: { id: commentId },
    });

    const postCommentLike = await postComment.getUsers({ attributes: ["id"] });
    const aa = postCommentLike;
    let likeCheck = false;
    postCommentLike.map((info) => {
      if (info.id === req.user.id) {
        likeCheck = true;
      }
    });

    res.send({
      postCommentLikeCount: postCommentLike,
      likeCheck: likeCheck,
      aa,
      commentId,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.renderAllStory = async (req, res, next) => {
  try {
    const stories = await Story.findAll({
      include: {
        model: User,
        attributes: ["id", "nickname", "profileImg"],
      },
    });

    const onlyInfoStory = stories.map((story) => story.dataValues);
    res.send(onlyInfoStory);
  } catch (error) {
    console.error(error);
  }
};

exports.renderOnlyStory = async (req, res, next) => {
  const storyId = req.params.storyId;

  try {
    const moreStory = await Story.findAll({
      where: {
        id: storyId,
      },
      include: {
        model: User,
        attributes: ["id", "nickname", "profileImg"],
      },
    });

    res.send(moreStory);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStoryComments = async (req, res, next) => {
  const storyId = req.params.storyId;
  try {
    const storyComments = await StoryComment.findAll({
      where: {
        StoryId: storyId,
        StoryCommentId: null,
      },
      include: {
        model: User,
        attributes: ["id", "nickname", "profileImg"],
      },
    });
    res.send(storyComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStoryReplyComments = async (req, res, next) => {
  const storyCommentId = req.params.commentId;

  try {
    const replyComments = await StoryComment.findAll({
      where: { StoryCommentId: storyCommentId },
      include: {
        model: User,
        attributes: ["id", "nickname", "profileImg"],
      },
    });
    const onlyInfoStoryReplyComments = replyComments.map(
      (comment) => comment.dataValues
    );

    res.send(onlyInfoStoryReplyComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderStoryReact = async (req, res) => {
  const storyId = req.params.storyId;
  try {
    const storyReacts = await ContactStory.findAll({
      where: {
        responseStoryId: storyId,
      },
    });

    const onlyInfoStoryReacts = storyReacts.map((react) => react.dataValues);

    res.send(onlyInfoStoryReacts);
  } catch (error) {
    console.error(error);
  }
};

exports.renderAllDiary = async (req, res, next) => {
  const userId = req.params.userId;
  if (userId) {
    try {
      const diaries = await Diary.findAll({
        where: {
          UserId: userId,
        },
        include: {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
        order: [["createdAt", "ASC"]],
      });

      const onlyInfoDiaries = diaries.map((diary) => diary.dataValues);
      res.send(diaries);
    } catch (error) {
      console.error(error);
    }
  }

  if (!userId) {
    try {
      const diaries = await Diary.findAll({
        include: {
          model: User,
          attributes: ["id", "nickname", "profileImg"],
        },
      });

      const onlyInfoDiaries = diaries.map((diary) => diary.dataValues);
      res.send(onlyInfoDiaries);
    } catch (error) {
      console.error(error);
    }
  }
};

exports.renderOnlyDiary = async (req, res, next) => {
  const diaryId = req.params.diaryId;

  try {
    const diary = await Diary.findAll({
      where: {
        id: diaryId,
      },
      include: {
        model: User,
        attributes: ["id", "nickname", "profileImg"],
      },
    });

    res.send(diary);
  } catch (error) {
    console.error(error);
  }
};

exports.renderDiaryComments = async (req, res, next) => {
  const diaryId = req.params.diaryId;
  try {
    const comments = await DiaryComment.findAll({
      where: {
        diaryId: diaryId,
        DiaryCommentId: null,
      },
      include: {
        model: User,
        attributes: ["id", "nickname", "profileImg"],
      },
    });
    res.send(comments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderDiaryReplyComments = async (req, res, next) => {
  const diaryCommentId = req.params.commentId;

  try {
    const replyComments = await DiaryComment.findAll({
      where: { DiaryCommentId: diaryCommentId },
      include: {
        model: User,
        attributes: ["id", "nickname", "profileImg"],
      },
    });
    const onlyInfoDiaryReplyComments = replyComments.map(
      (comment) => comment.dataValues
    );

    res.send(onlyInfoDiaryReplyComments);
  } catch (error) {
    console.error(error);
  }
};

exports.renderDiaryReact = async (req, res) => {
  try {
    const DiaryReacts = await ContactDiary.findAll({
      where: {
        responseDiaryId: req.params.diaryId,
      },
    });

    const onlyInfoStoryReacts = DiaryReacts.map((react) => react.dataValues);

    res.send(onlyInfoStoryReacts);
  } catch (error) {
    console.error(error);
  }
};
/*

exports.renderStoryComments = async(req,res,next)=> {
  try{
    const storyComments = await StoryComment.findAll()

  } catch(error){

  }
}*/
