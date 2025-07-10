import type { Movie } from "../types/movie";
import axios from 'axios';
interface MovieHttpResponse{
  results: Movie[],
  total_pages:number
}
const url = "https://api.themoviedb.org/3/search/movie"
const myKey = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(searchQuery: string, page:number): Promise<{results: Movie[], totalPages:number}> {
      const response = await axios.get<MovieHttpResponse>(url, {
        params: {
          query: searchQuery,
          page
        },
        headers: {
          Authorization: `Bearer ${myKey}`, 
        }
      }
      )
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
}}