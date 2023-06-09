export const fetchMoviesApi = (apiKey) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`, 
    },
  };

  return fetch(url, options).then((response) => response.json());
};
export const searchByKeywordsFromApi = (searchTerm, apiKey) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  return fetch(url, options).then((response) => response.json());
};

export const fetchMovieDetailsApi = (movieId, apiKey) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  return fetch(url, options).then((response) => response.json());
};
