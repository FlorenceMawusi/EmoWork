const reflectionRouter = require("express").Router();

const auth = require("./auth");

const Reflection = require("../models/reflections");

reflectionRouter.get("/", auth, (request, response) => {
  Reflection.find()
    .populate("activity likes comments")
    .select("content activity isPublic isPublished user likes comments")
    .then((res) => {
      const List = res.map((r) => r.toJSON());
      response.status(200).send(List);
    });
});

reflectionRouter.get("/user", auth, (request, response) => {
  const u_id = request.user.id;
  Reflection.findOne({ user: u_id })
    .then((res) => {
      console.log("res", res);

      response.status(200).send(res);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

reflectionRouter.post("/", auth, (request, response) => {
  const { content, activity } = request.body;
  console.log(content, activity, request.user);
  if (content && activity && request.user) {
    const newReflection = new Reflection({
      content: content,
      activity: activity,
      user: request.user.id,
      isPublic: isPublic,
      isPublished: isPublished,
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
  } else {
    response.status(501).send({ msg: "sorry, bad request" });
  }
});

reflectionRouter.patch("/update", auth, (request, response) => {
  console.log("we're entering the api")
  const { content, isPublic, isPublished, _id } = request.body;
  if (content && request.user && _id && isPublic !== undefined && isPublished !== undefined) {
    console.log("reqbody", request.body);
    Reflection.findByIdAndUpdate(
      { _id: _id },
      {
        $set: {
          content: content,
          isPublic: isPublic,
          isPublished: isPublished,
        },
      },
      { new: true }
    )
      .then((res) => {
        console.log("result", res);
        response.status(204).send(res);
      })
      .catch((err) => {
        console.log("error", err);
        response.sendStatus(501);
      });
  } else {
    response.status(501).send({ msg: "sorry, bad request" });
  }
});

module.exports = reflectionRouter;
