const Actor = require("../models/Actor");

exports.getActors = async (req, res) => {
  const actors = await Actor.find();
  res.json(actors);
};

exports.createActor = async (req, res) => {
  const actor = new Actor(req.body);
  await actor.save();
  res.json(actor);
};
