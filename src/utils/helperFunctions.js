// generate access token
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN, {
    expiresIn: "6h",
  });
};

// generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};
