const resultsRouter = require("express").Router();

const auth = require("./auth");



const Results = require("../models/results");

resultsRouter.get("/", auth, (request, response) => {
  Results.find({'user': request.user.id})
  .populate('user')
  .select('total date_taken user')
  .then((res) => {
    const List = res.map((r) => r.toJSON());
    response.status(200).send(List);
  });
});

resultsRouter.post("/", auth, (request, response) => {
  const { total } = request.body;
  if ( total && request.user )  {
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
  } else{
    response.status(501).send({'msg': "sorry, bad request"});
  }
});



module.exports = resultsRouter;
