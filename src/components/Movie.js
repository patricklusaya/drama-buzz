import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchMovies } from '../redux/action';

import '../App.css'


class Movie extends Component {

 componentDidMount(){
  this.props.fetchMovies()
 }

 render() {
  const { movies, error } = this.props;

  if (error) {
    return   <div className='movieError'> {error}: Check Your Internet connection</div>;
  }

  return (
    <div class='movie'>
      <h3>Popular 🔥</h3>
     

      <div className="movie-card-container">
  {movies.length === 0 ? (
   <div className='load'>
     <div className="loader ">
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
    </div>
   </div>
  ) : (
    movies.map((movie) => (
      <Link to={`/movie-details/${movie.id}`} state={movie} className="movie-card-link" key={movie.id}>
        <div className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="Movie Title"
            className="movie-card__image"
          />
          <div className="movie-card__details">
            <h2 className="movie-card__title">{movie.title}</h2>
            <p className="movie-card__overview">{movie.overview}</p>
          </div>
        </div>
      </Link>
    ))
  )}
</div>

</div>
  );
}
}
const mapStateToProps = (state) => ({
  movies: state.movies,
  error: state.error,
});

export default connect(mapStateToProps, { fetchMovies })(Movie);