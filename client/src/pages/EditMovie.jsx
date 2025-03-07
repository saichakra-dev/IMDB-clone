import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, updateMovie } from "../redux/movieSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);

  const [movieData, setMovieData] = useState({
    name: "",
    yearOfRelease: "",
    plot: "",
    producer: "",
    actors: [],
  });

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    const movie = movies.find((m) => m._id === id);
    if (movie) {
      setMovieData({
        name: movie.name,
        yearOfRelease: movie.yearOfRelease,
        plot: movie.plot,
        producer: movie.producer._id,
        actors: movie.actors.map((actor) => actor._id),
      });
    }
  }, [movies, id]);

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMovie({ id, movie: movieData }));
    navigate("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={movieData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="yearOfRelease"
          value={movieData.yearOfRelease}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="plot"
          value={movieData.plot}
          onChange={handleChange}
          className="border p-2 w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
