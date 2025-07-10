import type { Movie } from "../types/movie";
import axios from 'axios';
interface MovieHttpResponse{
  results:Movie[],
}
const url = "https://api.themoviedb.org/3/search/movie"
const myKey = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(searchQuery: string): Promise<Movie[]> {
      const response = await axios.get<MovieHttpResponse>(url, {
        params: {
          query: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${myKey}`,
        }
      }
      )
return response.data.results
}