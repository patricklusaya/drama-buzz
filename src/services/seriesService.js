import { apiKey } from "../components/config";
export const fetchSeriesFromApi = (apiKey) => {
    const url = `https://api.themoviedb.org/3/trending/tv/week?page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}` // Include the access token in the Authorization header
      }
    };
  
    return fetch(url, options)
      .then((response) => response.json());
  };


  export const fetchSimilarTVShows = (seriesId) => {
    const url = `https://api.themoviedb.org/3/tv/${seriesId}/similar?page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}` // Include the access token in the Authorization header
      }
    };
  
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch similar TV shows');
        }
        return response.json();
      });
  };
  
  export const fetchSimilarMovie = (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}` // Include the access token in the Authorization header
      }
    };
  
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch similar TV shows');
        }
        return response.json();
      });
  };
  