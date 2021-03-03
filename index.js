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
// const likes = require("./controllers/likes");
// const comments = require("./controllers/comments");

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


app.get("/api", (req, res) => {
  res.status(200).send(`Hi Welcome to the EmoWork API`);
});




 
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/activities", activity);
app.use("/api/reflections", reflection);
app.use("/api/results", results);
// app.use("/api/likes", likes);
// app.use("/api/comments", comments);

app.use("/",express.static(path.join(__dirname, "build")));


//PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

