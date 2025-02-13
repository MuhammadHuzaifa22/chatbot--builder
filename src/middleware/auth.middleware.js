// import modules
import jwt from "jsonwebtoken";
import Users from "../models/users.models";

// user authentication check
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
export default isUserAuthenticated;