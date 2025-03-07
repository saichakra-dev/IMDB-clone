const mongoose = require("mongoose");

const ProducerSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
  bio: String,
});

ProducerSchema.index({ name: 1 });

module.exports = mongoose.model("Producer", ProducerSchema);
