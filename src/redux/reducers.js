import { FETCH_MOVIES_SUCCESS,
   FETCH_MOVIES_FAILURE, FETCH_MOVIE_DETAILS_SUCCESS,
    FETCH_MOVIE_DETAILS_FAILURE, FETCH_SERIES_SUCCESS, 
    FETCH_SERIES_FAILURE , SEARCH_MOVIES, SET_SEARCH_TERM } from './types';
import {combineReducers} from 'redux'

const initialState={
    movies:[],
    movieDetails: null,
    series:[],
    searchResults: [],
    searchTerm: '',
    error:null

}

const moviesReducer = (state=initialState.movies,action)=>{
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
            return action.payload;
        case FETCH_MOVIES_FAILURE:
            return initialState;
           
    default:
      return state;

    } 

}
const searchMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIES:
      const searchTerm = action.payload.searchTerm.toLowerCase();
      const searchResults = state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm)
      );
      return {
        ...state,
        searchResults,
    };
    default:
      return state;
  }
};

const errorReducer= (state = initialState.error, action) =>{
switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
        return null;
        case FETCH_MOVIES_FAILURE:
            return action.payload
            default:
            return state
           
}
}

const seriesReducer= (state=initialState.series, action)=>{
  switch (action.type) {
    case FETCH_SERIES_SUCCESS:
      return action.payload
      case FETCH_SERIES_FAILURE:
            return initialState;
      default:
        return state    
  }
}



const movieDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MOVIE_DETAILS_SUCCESS:
        return {
          ...state,
          movieDetails: action.payload,
          error: null,
        };
      case FETCH_MOVIE_DETAILS_FAILURE:
        return {
          ...state,
          movieDetails: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  const searchTermReducer = (state = initialState, action) => {
    switch (action.type) {
    
      case SET_SEARCH_TERM:
        return {
          ...state,
          searchTerm: action.payload.searchTerm,
        };
  
  
  
      default:
        return state;
    }
  };
  
const rootReducer = combineReducers({
    movies: moviesReducer,
    error: errorReducer,
    movieDetails:movieDetailsReducer,
    series:seriesReducer,
    searchResults:searchMovieReducer,
    searchTerm:searchTermReducer
  });

  export default rootReducer;