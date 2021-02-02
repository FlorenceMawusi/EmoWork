const activityRouter = require("express").Router();

const Activity = require("../models/activities");

activityRouter.get("/", (request, response) => {
  const requestBody = request.body;
  Activity.find({}).then((res) => {
    const List = res.map((r) => r.toJSON());
    response.status(200).send(List);
  });
});

activityRouter.get("/:id", (request, response) => {
  const activityId = request.params.id; 
  Activity.findById(activityId).then((returnedActivity) =>
    response.send(returnedActivity.toJSON())
  );
});

activityRouter.post("/", async (request, response) => {
  const { title, reflection_prompt, benefits, picture } = request.body;

  if (title && benefits && reflection_prompt) {
    const newActivity = new Activity({
      title: title,
      reflection_prompt: reflection_prompt,
      benefits: benefits,
      picture: picture,
    });

    newActivity
      .save()
      .then((res) => {
        response.status(201).send(res.toJSON());
      })
      .catch((err) => {
        console.log(err);
        response.sendStatus(501);
      });
  } else {
    response.status(400).send({ msg: "Check your request body" });
  }
});

module.exports = activityRouter;
