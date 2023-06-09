import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSeries } from "../redux/action";
import { Link } from "react-router-dom";
import "../App.css";

class SeriesList extends Component {
  componentDidMount() {
    this.props.fetchSeries();
  }

  render() {
    const { series, error } = this.props;

    if (error) {
      return (
        <div className="movieError">
          {" "}
          {error}: Check Your Internet connection
        </div>
      );
    }

    return (
      <div class="series">
        <h3>Trending Tv Shows 🔥</h3>
        <div className="movie-card-container">
          {series.length === 0 ? (
            <div className="loader bounce">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
          ) : (
            series.map((data) => (
              <Link
                to={`/series-details/${data.id}`}
                state={data}
                className="movie-card-link"
              >
                <div className="movie-card" key={data.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                    alt="Movie Title"
                    className="movie-card__image"
                  />
                  <div className="movie-card__details">
                    <h2 className="movie-card__title">{data.name}</h2>
                    <p className="movie-card__overview">
                      Released on {data.first_air_date}
                    </p>
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
  series: state.series,
  error: state.error,
});

export default connect(mapStateToProps, { fetchSeries })(SeriesList);
