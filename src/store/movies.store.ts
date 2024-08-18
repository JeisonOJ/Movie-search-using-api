import type { Movie } from "@/model/movie.model";
import HTTP from "@/api/client-http";
import { defineStore } from "pinia";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    listMovies: [] as Movie[],
    selectedMovie: {} as Movie,
  }),
  actions: {
    async getMovies(search: string = "movies") {
      const resp = await HTTP.get("", {
        params: {
          s: search,
        },
      });
      this.listMovies = resp.data.Search;
    },
    async fetchMovieById(id: string) {
        try {
          const response = await HTTP.get("",{
            params: {
              i: id,
            },
          });
          this.selectedMovie = response.data;
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
  }
});
