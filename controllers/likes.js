const likesRouter = require("express").Router();

const auth = require("./auth");


const Likes = require("../models/comments");
const commentsRouter = require("./comments");

likesRouter.get("/", auth, (request, response) => {
  Likes.find()
  .populate('user reflection')
  .select('user reflection')
  .then((res) => {
    const List = res.map((r) => r.toJSON());
    response.status(200).send(List);
  });
});

commentsRouter.post("/", auth, (request, response) => {
  const { reflection } = request.body;
  if ( reflection && request.user )  {
    const newLike = new Likes({
      reflection: reflection,
      user: request.user.id,
      
    });

    newLike
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



module.exports = likesRouter;
