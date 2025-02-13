// success handler
const successHandler = async (message, statusCode, res, data = "") => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
};

// error handler
const errorHandler = async (message, statusCode, res, data = "") => {
  return res.status(statusCode).json({
    success: false,
    message: message,
    data: data,
  });
};


export { errorHandler, successHandler };