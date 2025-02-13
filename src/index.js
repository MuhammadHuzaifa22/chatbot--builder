// import modules
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./db/index.js";
const port = process.env.PORT;


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