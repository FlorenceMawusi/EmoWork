const reflectionRouter = require("express").Router();

const auth = require("./auth");

const { request, response } = require("express");
const Reflection = require("../models/reflections");

reflectionRouter.get("/", (request, response) => {
  console.log("This is the requestbody:", request.body);

  Reflection.find()
  .populate('activity')
  .select('content activity isPublic isPublished user')
  .then((res) => {
    const List = res.map((r) => r.toJSON());
    response.status(200).send(List);
  });
});

reflectionRouter.post("/", (request, response) => {
  const { content, activity } = request.body;

  if ( content && activity )  {
    const newReflection = new Reflection({
      content: content,
      activity: activity,
      
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
  }
});



module.exports = reflectionRouter;
