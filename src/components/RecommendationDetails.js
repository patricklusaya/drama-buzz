import React from "react";
import { Link, useLocation } from "react-router-dom";
export default function RecommendationDetails() {
  const location = useLocation();
  const propsData = location.state;
  console.log(propsData);
  return (
    <div>
      {propsData && (
        <div className="movie-details-container">
          <div className="movie-details">
            <div className="movie-details-content">
              <p className="movie-details-title">{propsData.title}</p>
              <p className="movie-details-overview">{propsData.description}</p>
              <p className="movie-details-info">
                <span className="movie-details-info-label">Release Year:</span>{" "}
                {propsData.releaseDate} <br />
                <span className="movie-details-info-label">
                  Recommended By:
                </span>{" "}
                {propsData.recommender}
              </p>
            </div>

            <div className="movie-details-image">
              <img src={`${propsData.movieImage}`} alt="Movie Poster" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
