// importing
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./src/db/index.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');

// middle wares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


// define main routes
app.use("/api/v1/users", require("./src/routes/users.routes.js"));
app.use("/api/v1/chatbots", require("./src/routes/chatbots.routes.js"));

// getting server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//  connect to data base
connectDB();

// server listen
app.listen(port, () => {
  console.log("App is listening on port", port);
});