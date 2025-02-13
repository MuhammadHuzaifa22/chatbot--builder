const jwt = require("jsonwebtoken");
const Users = require("../models/users.models");

const isUserAuthenticated = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "no token found" });
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
  const user = await Users.findById(decoded._id);
  if (!user) return errorHandler("User not found", 400, res);
  
  req.user = user;
  next();
};

// exporting middleware
module.exports = isUserAuthenticated;
