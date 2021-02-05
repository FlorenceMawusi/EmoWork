const reflectionRouter = require("express").Router();

const auth = require("./auth");


const Reflection = require("../models/reflections");

reflectionRouter.get("/", auth, (request, response) => {
  Reflection.find()
  .populate('activity likes comments')
  .select('content activity isPublic isPublished user likes comments')
  .then((res) => {
    const List = res.map((r) => r.toJSON());
    response.status(200).send(List);
  });
});

reflectionRouter.post("/", auth, (request, response) => {
  const { content, activity } = request.body;
  console.log(content, activity, request.user);
  if ( content && activity && request.user )  {
    const newReflection = new Reflection({
      content: content,
      activity: activity,
      user: request.user.id,
      
    });

    newReflection
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



module.exports = reflectionRouter;
