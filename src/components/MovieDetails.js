import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchSimilarMovie } from "../services/seriesService";
const MovieDetails = () => {
    const location = useLocation();
    const propsData = location.state;
    console.log(propsData);
    const movieId = propsData.id;
  
    const [similarMovie, setSimilarMovie] = useState([]);

    useEffect(() => {
      fetchSimilarMovie(movieId)
        .then((data) => {
          setSimilarMovie(data.results);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [movieId]);
    // fetchSimilarresponseDatas(seriesId );
  return (
    <>
     
      {propsData && (
      
       
        <div className="movie-details-container">
        <div className="movie-details">
          <div className="movie-details-content">

            <h1 className="movie-details-title">{propsData.title}</h1>
            <p className="movie-details-overview">{propsData.overview}</p>
            <p className="movie-details-info">
              <span className="movie-details-info-label">Release Date:</span> {propsData.release_date}
            </p>
            <p className="movie-details-info">
              <span className="movie-details-info-label">TMDB Rating:</span> {propsData.vote_average}/10
            </p>
          </div>

          <div className="movie-details-image">
            <img src={`https://image.tmdb.org/t/p/w500/${propsData.poster_path}`} alt="Movie Poster" />
            <a href="https://www.youtube.com/watch?v=qEVUtrk8_B4" target="_blank" rel="noopener noreferrer">
              <span className="play-icon">&#9658;</span>
            </a>
          </div>
        </div>
      </div>
      
      )}
     <div className="similar-tv-shows">
  <h2>Similar Movies</h2>
  <div className="tv-shows-list">
    {similarMovie.slice(0, 6).map((responseData) => (
    
      <Link to={`/series-details/${responseData.id}`} state={responseData}  key={responseData.id} className="tv-show-item">
        <img src={`https://image.tmdb.org/t/p/w300/${responseData.poster_path}`} alt="TV Show Poster" />
        <div className="tv-show-name">{responseData.name}</div>
      </Link>
    ))}
  </div>
</div>
    </>
  );
};
export default MovieDetails;