const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
  bio: String,
});

ActorSchema.index({ name: 1 });

module.exports = mongoose.model("Actor", ActorSchema);
