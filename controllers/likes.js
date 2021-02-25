const likesRouter = require("express").Router();

const auth = require("./auth");

const Likes = require("../models/likes");
const Reflection = require("../models/reflections");

likesRouter.get("/", auth, (request, response) => {
  Likes.find({})
    .populate("user reflection")
    .select("user reflection")
    .then((res) => {
      const List = res.map((r) => r.toJSON());
      response.status(200).send(List);
    })
    .catch((err) =>{
      response.status(500).send("Internal Server Error");
    });
});

likesRouter.delete("/", auth, (request, response) => {
  const { reflection_id } = request.body;

  if (reflection_id && request.user) {
    Likes.findOneAndDelete({
      reflection: reflection_id,
      user: request.user.id,
    })
      .then((res) => {
        response.status(200).send(res);
      })
      .catch((err) => {
        response.status(501).send("bad request");
      });
  } else{
    response.status(501).send("bad request");
  }
});

likesRouter.post("/", auth, async (request, response) => {
  const { reflection_id } = request.body;
  if (reflection_id && request.user) {
    const reflection = await Reflection.findOne({_id: reflection_id})
    if(reflection){

      const newLike = new Likes({
        reflection: reflection_id,
        user: request.user.id,
      });
  
      newLike
        .save()
        .then((res) => {
          reflection.likes.push(newLike);
          reflection.save();
          response.status(201).send(res.toJSON());
        })
        .catch((err) => {
          console.log(err);
          response.status(501).send({msg:err.message});
        });
    } else {
      response.status(501).send({ msg: "sorry, Reflection not found" });
    }

  } else {
    response.status(501).send({ msg: "sorry, bad request: either reflectionid or userid is missing." });
  }
});

module.exports = likesRouter;
