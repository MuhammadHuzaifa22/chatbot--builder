// import
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// creating schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true,"email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    chatBots: [
      {
        type: String,
        ref: "chatbot",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// exporting user model
const userModel = mongoose.model("User", userSchema);
export default userModel;