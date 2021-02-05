const commentsRouter = require("express").Router();

const auth = require("./auth");



const Comments = require("../models/comments");

commentsRouter.get("/", auth, (request, response) => {
  Comments.find()
  .populate('user')
  .select('text user')
  .then((res) => {
    const List = res.map((r) => r.toJSON());
    response.status(200).send(List);
  });
});

commentsRouter.post("/", auth, (request, response) => {
  const { text } = request.body;
 
  if ( text && request.user )  {
    const newComment = new Comments({
      content: content,
      activity: activity,
      user: request.user.id,
      
    });

    newComment
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



module.exports = commentsRouter;
