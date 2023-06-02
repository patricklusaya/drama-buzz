import { FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE, FETCH_MOVIE_DETAILS_SUCCESS, FETCH_MOVIE_DETAILS_FAILURE, FETCH_SERIES_SUCCESS, FETCH_SERIES_FAILURE } from './types';
import {combineReducers} from 'redux'

const initialState={
    movies:[],
    movieDetails: null,
    series:[],
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

  const seriesErrorReducer= (state=initialState.error, action)=>{
    switch (action.type) {
      case FETCH_SERIES_FAILURE:
        return action.payload
        case FETCH_MOVIES_SUCCESS:
          return null
          default: return state
        
       
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
const rootReducer = combineReducers({
    movies: moviesReducer,
    error: errorReducer,
    movieDetails:movieDetailsReducer,
    series:seriesReducer
  });

  export default rootReducer;