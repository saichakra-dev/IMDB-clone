const Movie = require("../models/Movie");
const Actor = require("../models/Actor");
const Producer = require("../models/Producer");
const axios = require("axios");
const mongoose = require("mongoose");

const IMDB_API_KEY = "6a6a1a78";

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate({ path: "producer", select: "name" }) // Explicitly select name
      .populate({ path: "actors", select: "name" }) // Explicitly select name
      .exec(); // Ensure query execution

    // console.log("Fetched movies:", JSON.stringify(movies, null, 2)); // Debugging log

    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { name, yearOfRelease, plot, producer, actors } = req.body;
    let poster = "";

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?t=${name}&apikey=${IMDB_API_KEY}`
      );
      poster = response.data.Poster;
    } catch (error) {
      console.error("IMDb API error:", error);
    }

    let producerId;
    if (mongoose.Types.ObjectId.isValid(producer)) {
      producerId = producer;
    } else {
      const newProducer = await Producer.create(producer);
      producerId = newProducer._id;
    }

    let actorIds = [];
    for (let actor of actors) {
      if (mongoose.Types.ObjectId.isValid(actor)) {
        actorIds.push(actor);
      } else {
        const newActor = await Actor.create(actor);
        actorIds.push(newActor._id);
      }
    }

    const movie = new Movie({
      name,
      yearOfRelease,
      plot,
      poster,
      producer: producerId,
      actors: actorIds,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, yearOfRelease, plot, producer, actors } = req.body;

    let producerId = mongoose.Types.ObjectId.isValid(producer)
      ? producer
      : (await Producer.create(producer))._id;

    let actorIds = [];
    for (let actor of actors) {
      actorIds.push(
        mongoose.Types.ObjectId.isValid(actor)
          ? actor
          : (await Actor.create(actor))._id
      );
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        name,
        yearOfRelease,
        plot,
        producer: producerId,
        actors: actorIds,
      },
      { new: true }
    )
      .populate("producer")
      .populate("actors");

    res.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    await Movie.findByIdAndRemove(id);
    res.status(200).json({ message: "movie deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// exports.getMovies = async (req, res) => {
//   try {
//     const name = req.body.name;
//     const movies = await Movie.find({ name: new RegExp(name, "i") }); //makes case sensitive
//     res.json(movies);
//   } catch (error) {
//     return res.status(500).json({ error: "Server error" });
//   }
// };
