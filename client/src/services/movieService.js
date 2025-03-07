import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/movies`;

export const getMovies = () => axios.get(API_URL);
export const createMovie = (movie) => axios.post(API_URL, movie);
export const updateMovie = (id, movie) => axios.put(`${API_URL}/${id}`, movie);
