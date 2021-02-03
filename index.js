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

InitiateMongoServer();

const app = express();

// app.get("/", (req, res) => {
//   res.status(200).send(`Hi Welcome to the EmoWork API`);
// });

//middleware
app.use(cors());
app.use(bodyParser.json());





/**
 * Router Middleware
 * Router - /users/*
 * Method - *
 */

 
app.use("/auth", auth);
app.use("/user", user);
app.use("/activities", activity);
app.use("/reflections", reflection);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "build")));
} else {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}


//PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

