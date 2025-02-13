// import modules
import jwt from "jsonwebtoken";
import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { errorHandler, successHandler } from "../utils/responseHandlers.js";

// register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) return errorHandler("User Name is required", 400, res);
    if (!email) return errorHandler("Email is required", 400, res);
    if (!password) return errorHandler("Password is required", 400, res);
    if (!validator.isEmail(email))
      return errorHandler("Email is not valid.", 400, res);

    // user already register check
    const user = await User.findOne({ email: email });
    if (user) return errorHandler("Email already exists", 400, res);

    // creating user
    const createdUser = await User.create({
      username,
      email,
      password,
    });

    return successHandler("User created successfully", 200, res, createdUser);
  } catch (error) {
    console.log("Unexpected error", error);
    return errorHandler(`Unexpected error ,${error}`, 400, res);
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return errorHandler("Email is required", 400, res);
  if (!password) return errorHandler("Password is required", 400, res);
  if (!validator.isEmail(email)) return errorHandler("Email is not valid", 400, res);
  const user = await User.findOne({ email: email });

  if (!user) return errorHandler("No user found.", 400, res);
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) return errorHandler("Password is not valid", 400, res);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return successHandler("Logged in successfully", 200, res, {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user,
  });
};

// logout user
const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken");
  return successHandler("Logout successfully", 200, res);
};

// refreshToken
const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token found" });
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
  const user = await User.findOne({ email: decoded.email });
  if (!user) return res.status(404).json({ message: "Invalid refresh token" });
  const generateToken = generateAccessToken(user);
  res
    .status(200)
    .json({ message: "access token generate", accessToken: generateToken });
  res.json({ decoded });
};

// export functions
export { registerUser, loginUser, logoutUser, refreshToken };