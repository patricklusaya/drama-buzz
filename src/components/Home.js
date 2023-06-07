import React, { Component } from 'react'
import {connect} from 'react-redux';
import { fetchMovies } from '../redux/action';
import '../App.css'
import Movie from './Movie';


class Home extends Component {

 render() {
  return (
    <div class='home'>
     <Movie/>
    </div>
  );
}
}
const mapStateToProps = (state) => ({
  movies: state.movies,
  error: state.error,
});

export default connect(mapStateToProps, { fetchMovies })(Home);