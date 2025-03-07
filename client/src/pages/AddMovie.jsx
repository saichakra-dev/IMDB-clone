import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../redux/movieSlice";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [movie, setMovie] = useState({
    name: "",
    yearOfRelease: "",
    plot: "",
    poster: "",
    producer: {
      name: "",
      gender: "",
      dob: "",
      bio: "",
    },
    actors: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleProducerChange = (e) => {
    setMovie({
      ...movie,
      producer: { ...movie.producer, [e.target.name]: e.target.value },
    });
  };

  const handleActorsChange = (e, index) => {
    const updatedActors = [...movie.actors];
    updatedActors[index] = {
      ...updatedActors[index],
      [e.target.name]: e.target.value,
    };
    setMovie({ ...movie, actors: updatedActors });
  };

  const addActor = () => {
    setMovie({
      ...movie,
      actors: [...movie.actors, { name: "", gender: "", dob: "", bio: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMovie(movie));
    console.log("Movie Added:", movie);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="yearOfRelease"
          placeholder="Year of Release"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="plot"
          placeholder="Plot"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        ></textarea>
        <input
          type="text"
          name="poster"
          placeholder="Poster Image URL"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        {/* Producer Input */}
        <h2 className="text-lg font-semibold mt-4">Producer Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Producer Name"
          onChange={handleProducerChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="gender"
          placeholder="Producer Gender"
          onChange={handleProducerChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="date"
          name="dob"
          placeholder="Producer DOB"
          onChange={handleProducerChange}
          className="border p-2 w-full rounded"
        />
        <textarea
          name="bio"
          placeholder="Producer Bio"
          onChange={handleProducerChange}
          className="border p-2 w-full rounded"
        ></textarea>

        {/* Actors Input */}
        <h2 className="text-lg font-semibold mt-4">Actors</h2>
        {movie.actors.map((actor, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Actor Name"
              value={actor.name}
              onChange={(e) => handleActorsChange(e, index)}
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              name="gender"
              placeholder="Actor Gender"
              value={actor.gender}
              onChange={(e) => handleActorsChange(e, index)}
              className="border p-2 w-full rounded"
            />
            <input
              type="date"
              name="dob"
              placeholder="Actor DOB"
              value={actor.dob}
              onChange={(e) => handleActorsChange(e, index)}
              className="border p-2 w-full rounded"
            />
            <textarea
              name="bio"
              placeholder="Actor Bio"
              value={actor.bio}
              onChange={(e) => handleActorsChange(e, index)}
              className="border p-2 w-full rounded"
            ></textarea>
          </div>
        ))}
        <button
          type="button"
          onClick={addActor}
          className="bg-gray-500 text-white px-4 py-2 rounded w-full"
        >
          Add Another Actor
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
