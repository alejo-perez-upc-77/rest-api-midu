import { readJSON } from "../utils.js";
import { randomUUID } from "node:crypto";

const movies = readJSON("./movies.json");
export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
      return filteredMovies;
    }
    return movies;
  };

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  };

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input,
    };

    movies.push(newMovie);

    return newMovie;
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) {
      return false;
    }

    movies.splice(movieIndex, 1);

    return "Movie deleted";
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) {
      return false;
    }

    const updateMovie = {
      ...movies[movieIndex],
      ...input,
    };

    movies[movieIndex] = updateMovie;

    return movies[movieIndex];
  }
}
