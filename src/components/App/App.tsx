import css from'./App.module.css'
import SearchBar from "../SearchBar/SearchBar"
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

import { useQuery, keepPreviousData} from '@tanstack/react-query';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const {data, isLoading, isError} = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  })
  
  async function handleSearch(searchQuery: string) {
    setQuery(searchQuery)
    setCurrentPage(1)
  }

  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error("No movies found for your request.")
  }
  }, [data])
  
  
  const totalPages = data?.totalPages ?? 0;
  return <>
    <Toaster/>
    <SearchBar onSubmit={handleSearch} />
{ totalPages > 1 &&   <ReactPaginate
       pageCount={totalPages}
       pageRangeDisplayed={5}
       marginPagesDisplayed={1}
       onPageChange={({ selected }) => setCurrentPage(selected + 1)}
       forcePage={currentPage - 1}
       containerClassName={css.pagination}
       activeClassName={css.active}
       nextLabel="→"
       previousLabel="←"
       
      />}
    <Loader showLoading={isLoading} />
    <ErrorMessage showErrorMessage={isError} />
    {data && data.results.length > 0 && <MovieGrid movies={data.results} onSelect={setSelectedMovie}/>}
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
  </>
}

