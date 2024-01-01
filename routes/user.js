const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const {
  follow,
  checkFollower,
  unfollow,
  renderFollowInfo,
} = require("../controllers/user");
const { findUserById } = require("../controllers/user");

router.get("/:id", isLoggedIn, findUserById);
router.get("/find-follower/:userId", renderFollowInfo);
router.get("/check-follower/:userId", checkFollower);
router.post("/:id/follow", isLoggedIn, follow);
router.post("/:id/unfollow", isLoggedIn, unfollow);

module.exports = router;
