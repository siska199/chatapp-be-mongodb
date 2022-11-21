const express = require("express");
const auth = require("../middleware/auth");
const {
  register,
  login,
  logout,
  updateUser,
  getUser,
} = require("../controller/user");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/user", auth, getUser);
router.patch("/user", auth, updateUser);

module.exports = router;
