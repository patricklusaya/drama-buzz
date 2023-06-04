import { Link, useLocation } from "react-router-dom";
import {fetchSimilarTVShows} from '../services/seriesService'
import React, { useEffect, useState } from "react";
import '../App.css'
const SeriesDetails = () => {
    const location = useLocation();
    const propsData = location.state;
    // console.log(propsData);
    const seriesId = propsData.id;
    console.log(seriesId);
    const [similarTVShows, setSimilarTVShows] = useState([]);

    useEffect(() => {
      fetchSimilarTVShows(seriesId)
        .then((data) => {
          setSimilarTVShows(data.results);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [seriesId]);
    // fetchSimilarTVShows(seriesId );
  
  return (
    <>
     
      {propsData && (
      
       <div>
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
      
       </div>
      )}


  <div className="similar-tv-shows">
  <h2>Similar TV Shows</h2>
  <div className="tv-shows-list">
    {similarTVShows.slice(0, 6).map((tvShow) => (
    
      <Link to={`/series-details/${tvShow.id}`} key={tvShow.id} state={tvShow} className="tv-show-item">
        <img src={`https://image.tmdb.org/t/p/w300/${tvShow.poster_path}`} alt="TV Show Poster" />
        <div className="tv-show-name">{tvShow.name}</div>
      </Link>
    ))}
  </div>
</div>


    
    </>
  );
};
export default SeriesDetails;