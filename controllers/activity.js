const activityRouter = require("express").Router();
const auth = require("./auth");

const Activity = require("../models/activities");
const Reflection = require("../models/reflections");

activityRouter.get("/", auth, async (request, response) => {
  user_reflections = await Reflection.find({ user: request.user.id });
  Activity.find({})

    .populate("reflection")
    .then((res) => {
      if (user_reflections) {
        const activityList = res.map((r) => r.toJSON());
        const refList = user_reflections.map((r) => r.toJSON());
        const refCount = refList.length;

        let i = 0;
        while (i <= refCount) {
          activityList[i].disabled = false;
          i += 1;
        }
        let j = 0;
        while (j < refCount) {
          refList[j].isPublished
            ? (activityList[j].isComplete = "yes")
            : (activityList[j].isComplete = "no");
          j += 1;
        }

       
        //set the next item in the list disabled = false.
        response.status(200).send(activityList);
      } else {
        //change the index[0].disabled = false
        res[0].disabled = false;

        const List = res.map((r) => r.toJSON());
       
        response.status(200).send(List);
      }
    })
    .catch((err) => {
      response.status(500).send("Internal Server Error");
    });

  // user_reflections = await Reflection.find({ user: request.user.id });
});

//get the reflections where the user id is there.
//If there is none, send the

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
    response.status(501).send({ msg: "Check your request body" });
  }
});

module.exports = activityRouter;
