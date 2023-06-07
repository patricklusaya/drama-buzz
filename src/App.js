
import { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import { Provider } from 'react-redux';
import store from './redux/store'
import MovieDetails from './components/MovieDetails';
import SeriesList from './components/SeriesList';
import Auth from './components/Auth';
import SeriesDetails from './components/SeriesDetails';
import Recommendations from './components/Recommendations';
import RecommendMovie from './components/RecommendMovie';
import { auth } from './components/config/firebase';
import RecommendationDetails from './components/RecommendationDetails';
class App extends Component {
  handleSignOut = () => {
    auth.signOut() // Sign out the user using Firebase auth
      .then(() => {
        console.log('User signed out successfully.');
        // Perform any additional actions after signing out if needed
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  render() {
    const isLoggedIn = auth.currentUser !== null;
    return (
      <Provider store={store}>
      <Router>
         
      <div className="App">
      
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />}/>
          {/* <Route path="/about" element={<About />}/> */}
          <Route path="/tv-shows" element={<SeriesList />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/recommendations" element={<Recommendations />}/>
          <Route path="/recommendation-details/:id" element={<RecommendationDetails />}/>
          <Route path="/recommend" element={<RecommendMovie />}/>
          <Route path="/movie-details/:id" element={<MovieDetails />} />
          <Route path="/series-details/:id" element={<SeriesDetails />} />
          </Routes>
  
      </div>
    
      </Router>
      </Provider>
    );
  }
}


export default App;
