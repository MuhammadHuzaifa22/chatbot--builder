// import modules
import express from "express";
import {
  createChatBot,
  uploadImage,
} from "../controllers/chatbots.controllers.js";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

// define routes
router.post("/create", createChatBot);
router.post("/uploadImage", upload.single("image"), uploadImage);


// export router
export default router;