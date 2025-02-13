// import mongoose
import mongoose from "mongoose";

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
const chatbotModel = mongoose.model('ChatBot',chatBotsSchema);
export default chatbotModel;