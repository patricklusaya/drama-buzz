import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMovies, searchMovies, setSearchTerm } from '../redux/action';

import '../App.css';

class Movie extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }
  handleSearch = () => {
    const searchTerm = this.props.searchTerm; 
    this.props.searchMovies(searchTerm);
  };
  handleInputChange = (event) => {
    const searchTerm = event.target.value;
    this.props.setSearchTerm(searchTerm);
  };
  

 

  render() {
    const { movies, searchResults, error } = this.props;
    console.log(this.props.searchTerm);

    if (error) {
      return <div className="movieError">{error}: Check Your Internet connection</div>;
    }

    const displayMovies = searchResults.length > 0 ? searchResults : movies;

    return (
      <div className="movie">
     
      <h2>Trending Movies</h2>

        <div className="movie-card-container">
          {displayMovies.length === 0 ? (
            <div className="load">
              <div className="loader">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
              </div>
            </div>
          ) : (
            displayMovies.map((movie) => (
              <Link
                to={`/movie-details/${movie.id}`}
                state={movie}
                className="movie-card-link"
                key={movie.id}
              >
                <div className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="img"
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
  searchResults: state.searchResults,
  error: state.error,
  searchTerm: state.searchTerm 
});
const mapDispatchToProps = (dispatch) => ({
  fetchMovies: () => dispatch(fetchMovies()),
  searchMovies: (searchTerm) => dispatch(searchMovies(searchTerm)),
  setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Movie);
