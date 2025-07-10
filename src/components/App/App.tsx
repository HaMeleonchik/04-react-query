import './App.module.css'
import SearchBar from "../SearchBar/SearchBar"
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [Movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  async function handleSearch(searchQuery: string) {
    try {
      setMovies([]);
      setLoading(true)
      setError(false)
      const data = await fetchMovies(searchQuery)
      if (data.length === 0) {
        toast.error("No movies found for your request.")
        return
      }
    setMovies(data);
     
    } catch (error) {
      setError(true)
      console.log(error);
    } finally {
      setLoading(false)
   }

  }
  
  return <>
    <Toaster/>
    <SearchBar onSubmit={handleSearch} />
    <Loader showLoading={isLoading} />
    <ErrorMessage showErrorMessage={isError}/>
    {Movies.length > 0 && <MovieGrid movies={Movies} onSelect={setSelectedMovie} />}
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={()=>setSelectedMovie(null) } />}
  </>
}

