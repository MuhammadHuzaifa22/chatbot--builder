// importing
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} = require("../controllers/users.controllers.js");
const router = express.Router();

// define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/log-out-user",)


// exporting router
module.exports = router;
