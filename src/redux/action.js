import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE,
   FETCH_MOVIE_DETAILS_SUCCESS, FETCH_MOVIE_DETAILS_FAILURE, FETCH_SERIES_FAILURE,
    FETCH_SERIES_SUCCESS } from "./types"
import { fetchMoviesApi } from '../services/movieService';
import { fetchSeriesFromApi } from "../services/seriesService";
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTNmZGE2YzBkOTQzNzJmNGE2MTY3OGJiYmE2M2NiZSIsInN1YiI6IjVmMzJhMTAwNjYzYjg3MDAzNzUxNmQ2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.amIvSiL5AFK4h-bMvCjVFco6LHk86IiEVm4LlWlVhN8';

  
export const fetchMovieSuccess = (movies) => ({
    type: FETCH_MOVIES_SUCCESS,
    payload: movies,
  });
  
  export const fetchMovieFailure = (error) =>({
    type: FETCH_MOVIES_FAILURE,
    payload:error

  })

  export const fetchSeriesSuccess = (series) => ({
    type: FETCH_SERIES_SUCCESS,
    payload: series,
  });

  export const fetchSeriesFailure = (error) =>({
    type: FETCH_SERIES_FAILURE,
    payload:error
  })
  export const fetchMovieDetailsSuccess = (movie) => ({
    type: FETCH_MOVIE_DETAILS_SUCCESS,
    payload: movie,
  });
  
  export const fetchMovieDetailsFailure = (error) => ({
    type: FETCH_MOVIE_DETAILS_FAILURE,
    payload: error,
  });

  export const fetchMovies=() =>{
    return (dispatch) => {
        fetchMoviesApi(apiKey)
        .then((response) => {
            const movies = response.results; // Extract the movies array from the response
            dispatch(fetchMovieSuccess(movies));
          })
        .catch((error)=> dispatch(fetchMovieFailure(error.message)))
    }
  }

  export const fetchSeries=() =>{
    return (dispatch) => {
        fetchSeriesFromApi(apiKey)
        .then((response) => {
            const series = response.results; // Extract the movies array from the response
            dispatch(fetchSeriesSuccess(series));
          })
        .catch((error)=> dispatch(fetchSeriesFailure(error.message)))
    }
  }

  export const fetchMovieDetails = (movieId) => {
    return (dispatch) => {
      fetchMovieDetails(movieId, apiKey) // Replace `fetchMovieDetailsApi` with your actual API function to fetch movie details
        .then((response) => {
          const movieDetails = response.data; // Adjust this line based on the structure of your API response
          dispatch(fetchMovieDetailsSuccess(movieDetails));
        })
        .catch((error) => dispatch(fetchMovieDetailsFailure(error.message)));
    };
  };