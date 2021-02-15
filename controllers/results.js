const resultsRouter = require("express").Router();

const auth = require("./auth");

const Results = require("../models/results");

resultsRouter.get("/", auth, (request, response) => {
  Results.find({ user: request.user.id }).sort({date_taken: "descending"})
    .then((res) => {
      const List = res.map((r) => r.toJSON());
      response.status(200).send(List);
    })
    .catch((err) => {
      console.log(err);
      response.sendStatus(501);
    });
});

resultsRouter.post("/", auth, (request, response) => {
  const { total } = request.body;
  if (total && request.user) {
    console.log("results", total);
    const newResults = new Results({
      total: total,
      user: request.user.id,
    });

    newResults
      .save()
      .then((res) => {
        response.status(201).send(res.toJSON());
      })
      .catch((err) => {
        console.log(err);
        response.sendStatus(501);
      });
  } else {
    response.status(501).send({ msg: "sorry, bad request" });
  }
});

// reflectionRouter.get("/", auth, (request, response) => {
//   Results.find({_id: request.user.id})
//     .then((res) => {
//       const List = res.map((r) => r.toJSON());
//       response.status(200).send(List);
//     });
// });

module.exports = resultsRouter;
