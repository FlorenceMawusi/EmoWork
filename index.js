const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const user = require("./controllers/user");
const activity = require("./controllers/activity");
const reflection = require("./controllers/reflection");
require("dotenv").config();
const cors = require("cors");
const path = require('path');
const auth = require("./controllers/auth");
const results = require("./controllers/results");
const likes = require("./controllers/likes");
const comments = require("./controllers/comments");

InitiateMongoServer();

const app = express();



//middleware
app.use(cors());
app.use(bodyParser.json());





/**
 * Router Middleware
 * Router - /users/*
 * Method - *
 */

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "build")));
// } else {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "build")));
//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }

app.use("/",express.static(path.join(__dirname, "build")));

app.get("/api", (req, res) => {
  res.status(200).send(`Hi Welcome to the EmoWork API`);
});
 
app.use("/auth", auth);
app.use("/user", user);
app.use("/activities", activity);
app.use("/reflections", reflection);
app.use("/results", results);
app.use("/likes", likes);
app.use("/comments", comments);




//PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

