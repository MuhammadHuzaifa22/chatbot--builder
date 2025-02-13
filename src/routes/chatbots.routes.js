// importing
const express = require("express");
const {
  createChatBot,
  uploadImage,
} = require("../controllers/chatbots.controllers");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

// define routes
router.post("/create", createChatBot);
router.post("/uploadImage", upload.single("image"), uploadImage);


// export router
module.exports = router;