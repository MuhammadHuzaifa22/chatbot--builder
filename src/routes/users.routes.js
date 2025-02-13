// import modules
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/users.controllers.js";
const router = express.Router();

// define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logoutUser);


// exporting router
export default router;