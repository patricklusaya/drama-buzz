import React, { Component } from 'react';
import { auth, db } from './config/firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';
import DeleteMovieButton from './DeleteMovieButton';
import UpdateMovieButton from './UpdateMovieButton';
import {Link} from 'react-router-dom'

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      userMoviesCount: 0,
    };
  }

  componentDidMount() {
    const movieCollection = collection(db, 'movies');
    const getMovies = () => {
      getDocs(movieCollection)
        .then((allMovies) => {
          const moviesData = allMovies.docs.map((doc) => {
            const movie = doc.data();
            movie.id = doc.id;
            return movie;
          });
          console.log(moviesData);
          this.setState({ movies: moviesData });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getMovies();
    const id = auth.currentUser?.uid;

let moviesQuery;

if (id) {
  moviesQuery = query(movieCollection, where('userId', '==', id));
} else {
  // If the user is not logged in, you can set moviesQuery to an empty query or null
  moviesQuery = null; // or moviesQuery = query(movieCollection, where('userId', '==', 'invalid'));
}

if (moviesQuery) {
  // Execute the query and handle the results
  getDocs(moviesQuery)
    .then((querySnapshot) => {
      // Process the query results
      const moviesData = querySnapshot.docs.map((doc) => {
        const movie = doc.data();
        movie.id = doc.id;
        return movie;
      });

      this.setState({
        userMoviesCount: moviesData.length,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

  }

  



  render() {
    const isLoggedIn = auth.currentUser !== null;
    const { movies } = this.state;
    const user = auth.currentUser?.displayName;

    const { userMoviesCount } = this.state;

    return (
      <div className='allRecomendations'>
      {isLoggedIn && (
        <p className="alert">
          Welcome {user}, you have recommended {userMoviesCount}{' '}
          {userMoviesCount === 1 ? 'movie' : 'movies'} so far.
        </p>
      )}
      {isLoggedIn && (
        <Link to="recommend">
          <button className="round-button">
            <i className="fas fa-plus"></i>
          </button>
        </Link>
      )}
          
        <div className='recommendationss'>
      
          {movies.map((movie) => (
            <div key={movie.id} className='card'>
              <div className='images'>
                <img
                  src='https://alternativemovieposters.com/wp-content/uploads/2020/02/woodhead_cabininwoods.jpg'
                  alt={movie.title}
                  className='movie-images'
                />
                <icon className='red'>
                  <a>❤</a>
                </icon>
              </div>
              <div className='content'>
                <h4>{movie.title}</h4>
                <p>{movie.description.length > 50 ? movie.description.substring(0, 50) + '...' : movie.description}</p>
                <p>Recommended by: Jude {movie.recommender}</p>
              </div>
              <div className='deleteBtns'>
                <DeleteMovieButton createdBy={movie.userId} id={movie.id} />
              </div>
              <div className='updateBtns'>
                <UpdateMovieButton
                  id={movie.id}
                  initialTitle={movie.title}
                  initialDescription={movie.description}
                  initialReleaseDate={movie.releaseDate}
                  fetchMovies={this.getMovies}
                  createdBy={movie.userId}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Recommendations;
