const mongoose = require("mongoose");

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const InitiateMongoServer = () => {
  mongoose
    .connect(process.env.MONGODB_URI, config)
    .then(() => {
      console.log("Connection to database successful!");
    })
    .catch((err) => {
      console.error("db connection failed:", err);
    });
};

module.exports = InitiateMongoServer;
