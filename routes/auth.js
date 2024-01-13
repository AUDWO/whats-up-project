const express = require("express");
const router = express.Router();
const { join, login, logout } = require("../controllers/auth");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

router.post("/sign-up", isNotLoggedIn, join);

router.post("/login", isNotLoggedIn, login);

router.post("/logout", isLoggedIn, logout);

module.exports = router;
