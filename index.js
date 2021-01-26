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

app.get("/", (req, res) => {
  res.status(200).send(`Hi Welcome to the EmoWork API`);
});

//middleware
app.use(cors());
app.use(bodyParser.json());



//render html file
app.get('/app', (req, res) => {
  console.log('dir name -> ', __dirname);
  console.log('checking for path -> ', path.join(__dirname + '/build/index.html'))
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

/**
 * Router Middleware
 * Router - /users/*
 * Method - *
 */

 
app.use("/auth", auth);
app.use("/user", user);
app.use("/activities", activity);
app.use("/reflections", reflection);

//PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
