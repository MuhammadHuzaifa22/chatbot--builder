// This file contains all the configuration for the express app

// Import modules
import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.routes.js";
import chatbotRoutes from "./routes/chatbots.routes.js";

//? Initialize express app
const app = express();
const morganFormat = ":method :url :status :response-time ms";

//? Inject application level middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
//? Logger configuration for better logging info
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// define main routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chatbots", chatbotRoutes);

//? Export the configured app
export default app;