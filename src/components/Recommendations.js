import React, { Component } from "react";
import { auth, db } from "./config/firebase";
import { getDocs, collection, where, query } from "firebase/firestore";
import DeleteMovieButton from "./DeleteMovieButton";
import UpdateMovieButton from "./UpdateMovieButton";
import { Link } from "react-router-dom";

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      userMoviesCount: 0,
      screenWidth: window.innerWidth,
    };
  }

  getMovies = () => {
    const movieCollection = collection(db, "movies");
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
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    const movieCollection = collection(db, "movies");
    this.getMovies();
    const id = auth.currentUser?.uid;

    let moviesQuery;

    if (id) {
      moviesQuery = query(movieCollection, where("userId", "==", id));
    } else {
      // If the user is not logged in, you can set moviesQuery to an empty query or null
      moviesQuery = null; 
    }

    if (moviesQuery) {
      
      getDocs(moviesQuery)
        .then((querySnapshot) => {
        
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
  deleteMovie = (id) => {
    
    this.setState((prevState) => ({
      movies: prevState.movies.filter((movie) => movie.id !== id),
    }));
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth,
    });
  };
  render() {
    const { screenWidth } = this.state;
    const isLoggedIn = auth.currentUser !== null;
    const { movies } = this.state;
    const user = auth.currentUser?.displayName;

    const { userMoviesCount } = this.state;

    return (
      <div className="allRecomendations">
        {isLoggedIn && (
          <p className="alert">
            {userMoviesCount === 0
              ? `Welcome ${user}, you have not recommended any movie yet.`
              : `Welcome ${user}, you have recommended ${userMoviesCount} ${
                  userMoviesCount === 1 ? "movie" : "movies"
                } so far.`}
          </p>
        )}

        {isLoggedIn && (
          <Link to="/recommend">
            <button className="round-button">
              <i className="fas fa-plus"></i>
            </button>
          </Link>
        )}

        <div className="recommendationss">
          <h3>Recommended By The Public</h3>
          {movies.length === 0 ? (
            <div className="load">
              <div className="loader ">
                <div className="ball"></div>
                <div className="ball"></div>
                <div className="ball"></div>
              </div>
            </div>
          ) : (
            movies.map((movie) => (
              <div>
                <div key={movie.id} className="card">
                  <div className="images">
                    <img
                      src={movie.movieImage}
                      alt={movie.title}
                      className="movie-images"
                    />
                    <icon className="red">
                      <a>❤</a>
                    </icon>
                  </div>
                  <div className="content">
                    <Link
                      to={`/recommendation-details/${movie.id}`}
                      state={movie}
                      style={{ textDecoration: "none" }}
                    >
                      <h4>{movie.title}</h4>
                    </Link>
                    <p>
                      {screenWidth <= 600
                        ? movie.description.substring(0, 25) + "..."
                        : movie.description.length > 120
                        ? movie.description.substring(0, 120) + "..."
                        : movie.description}
                    </p>
                    <p>Recommended by: {movie.recommender}</p>
                  </div>
                  <div className="deleteBtns">
                    <DeleteMovieButton
                      createdBy={movie.userId}
                      id={movie.id}
                      deleteMovie={this.deleteMovie}
                    />
                  </div>
                  <div className="updateBtns">
                    <UpdateMovieButton
                      id={movie.id}
                      initialTitle={movie.title}
                      initialDescription={movie.description}
                      initialReleaseDate={movie.releaseDate}
                      getMovies={this.getMovies}
                      createdBy={movie.userId}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Recommendations;
