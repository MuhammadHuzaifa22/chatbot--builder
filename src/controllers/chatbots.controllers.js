// importing
const exportData = require("../functions/exportData");
const fetchSitemap = require("../functions/fetchSitemap");
const scrapePages = require("../functions/webScraper");
const { errorHandler, successHandler } = require("../utils/responseHandlers");
const Users = require("../models/users.models"); // user model
const ChatBots = require("../models/chatbot.models");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dyir4qmaf",
  api_key: "657714617621714",
  api_secret: "ULeuLaBnQnk_SgNpMkpw6CQFYtI",
});

// upload image to cloudinary
const uploadImageToCloudinary = async (localpath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    console.log("local path ==>", localpath);
    fs.unlinkSync(localpath);
    return uploadResult.url;
  } catch (error) {
    fs.unlinkSync(localpath);
    return null;
  }
};

// create chatbot with data scrapping
const createChatBot = async (req, res) => {
  try {
    // request from body
    console.log('create chat bot function')
    const { name, tagline, webURL, userID, image } = req.body;
    console.log("web url ===>", webURL);

    // fetching sitemap
    const urls = await fetchSitemap(webURL);
    if (!urls)
      return errorHandler(`Sorry , We can't find this site's data.`, 400, res);

    const rawData = await scrapePages(urls); // scrapping pages
    if (!rawData)
      return errorHandler(
        `We can't find this site's data because it's restricted`,
        400,
        res
      );

    // chat bot image url generating
    // const chatBotImageURL = await uploadImage(req, res, image);
    // console.log("chatbot image url ===>", chatBotImageURL);

    // create chatbot
    const chatBot = await ChatBots.create({
      name: name,
      tagline: tagline,
      createdBy: userID,
      image: "",
    });

    // update user
    const user = await Users.findByIdAndUpdate(
      { _id: userID },
      { $push: { chatBots: chatBot._id.toString() } },
      { new: true, runValidators: true }
    );

    return successHandler("Chat Bot created successfully", 200, res);
  } catch (error) {
    console.log("Unexpected error", error);
    return errorHandler(`Unexpected error ${error}`, 400, res);
  }
};

// upload image
const uploadImage = async (req, res, image) => {
  try {
    const profileLocalPath = image.path;
    if (!profileLocalPath)
      return errorHandler("Profile image is required", 400, res);

    const uploadResult = await uploadImageToCloudinary(profileLocalPath);
    if (!uploadResult)
      return errorHandler(`Error occured while uploading image`, 400, res);
    successHandler(`Image uploaded successfully`, 200, res, uploadResult);

    return uploadResult;
  } catch (error) {
    console.log(`Unexpected error ${error}`);
    return errorHandler(`Unexpected error ${error}`, 400, res);
  }
};

// exporting chatbot
module.exports = { createChatBot, uploadImage };
