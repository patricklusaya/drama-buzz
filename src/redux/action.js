import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
  FETCH_SERIES_FAILURE,
  SEARCH_MOVIES,
  FETCH_SERIES_SUCCESS,
  SET_SEARCH_TERM,
} from "./types";
import {
  fetchMoviesApi,
  searchByKeywordsFromApi,
} from "../services/movieService";
import { fetchSeriesFromApi } from "../services/seriesService";
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTNmZGE2YzBkOTQzNzJmNGE2MTY3OGJiYmE2M2NiZSIsInN1YiI6IjVmMzJhMTAwNjYzYjg3MDAzNzUxNmQ2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.amIvSiL5AFK4h-bMvCjVFco6LHk86IiEVm4LlWlVhN8";

export const fetchMovieSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

export const fetchMovieFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const fetchSeriesSuccess = (series) => ({
  type: FETCH_SERIES_SUCCESS,
  payload: series,
});

export const fetchSeriesFailure = (error) => ({
  type: FETCH_SERIES_FAILURE,
  payload: error,
});
export const fetchMovieDetailsSuccess = (movie) => ({
  type: FETCH_MOVIE_DETAILS_SUCCESS,
  payload: movie,
});

export const fetchMovieDetailsFailure = (error) => ({
  type: FETCH_MOVIE_DETAILS_FAILURE,
  payload: error,
});

export const searchMovies = (searchTerm) => {
  return {
    type: SEARCH_MOVIES,
    payload: {
      searchTerm,
    },
  };
};

export const fetchMovies = () => {
  return (dispatch) => {
    fetchMoviesApi(apiKey)
      .then((response) => {
        const movies = response.results; 
        dispatch(fetchMovieSuccess(movies));
      })
      .catch((error) => dispatch(fetchMovieFailure(error.message)));
  };
};

export const fetchSeries = () => {
  return (dispatch) => {
    fetchSeriesFromApi(apiKey)
      .then((response) => {
        const series = response.results; 
        dispatch(fetchSeriesSuccess(series));
      })
      .catch((error) => dispatch(fetchSeriesFailure(error.message)));
  };
};

export const handleSearch = (searchTerm) => {
  return (dispatch, getState) => {
    searchByKeywordsFromApi(searchTerm)
      .then((response) => {
        const searchResults = response.results;
        dispatch(searchMovies(searchResults));
      })
      .catch((error) => {
        dispatch(fetchMovieFailure(error.message));
      });
  };
};
export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: {
    searchTerm,
  },
});
export const fetchMovieDetails = (movieId) => {
  return (dispatch) => {
    fetchMovieDetails(movieId, apiKey)
      .then((response) => {
        const movieDetails = response.data; 
        dispatch(fetchMovieDetailsSuccess(movieDetails));
      })
      .catch((error) => dispatch(fetchMovieDetailsFailure(error.message)));
  };
};
