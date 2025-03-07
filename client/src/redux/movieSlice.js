import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/movies`;

// Fetch movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(API_URL);

  return response.data;
});

// Add movie
export const addMovie = createAsyncThunk("movies/addMovie", async (movie) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
});

// Update movie
export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, movie }) => {
    const response = await axios.put(`${API_URL}/${id}`, movie);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: { movies: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (m) => m._id === action.payload._id
        );
        if (index !== -1) state.movies[index] = action.payload;
      });
  },
});

export default movieSlice.reducer;
