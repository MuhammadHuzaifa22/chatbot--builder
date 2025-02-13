// import mongoose
const mongoose = require("mongoose");

// Chat bot schema
const chatBotsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Chat Bot name is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },tagline:{
    type:String,
  },image:{
    type:String
  }
});

// export schema
module.exports = mongoose.model('ChatBot',chatBotsSchema);
