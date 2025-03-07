const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: { type: String, index: true },
  yearOfRelease: Number,
  plot: String,
  poster: String,

  producer: { type: mongoose.Schema.Types.ObjectId, ref: "Producer" },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
});

MovieSchema.index({ name: 1, yearOfRelease: -1 });

module.exports = mongoose.model("Movie", MovieSchema);
