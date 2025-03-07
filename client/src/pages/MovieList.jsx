import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice.js";
import { Link } from "react-router-dom";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <Link
        to="/add-movie"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Movie
      </Link>

      {loading && <p>Loading...</p>}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="border p-4 rounded-lg shadow-md">
            {/* Movie Poster */}
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.name}
                className="w-full  object-cover rounded-lg mb-4 "
              />
            )}

            {/* Movie Details */}
            <h2 className="text-xl font-bold">
              {movie.name} ({movie.yearOfRelease})
            </h2>
            <p className="mt-2">
              <strong>Plot:</strong> {movie.plot}
            </p>

            {/* Producer Details */}
            {movie.producer && (
              <div className="mt-2">
                <strong>Producer:</strong> {movie.producer.name} <br />
              </div>
            )}

            {/* Actors List */}
            {movie.actors && movie.actors.length > 0 && (
              <div className="mt-2">
                <strong>Actors:</strong>
                <ul className="list-disc ml-4">
                  {movie.actors.map((actor) => (
                    <li key={actor._id}>{actor.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Edit Movie Button */}
            <Link
              to={`/edit-movie/${movie._id}`}
              className="text-blue-500 block mt-3"
            >
              Edit Movie
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
