import React, { Component } from 'react'
import { db, auth } from './config/firebase';
import { updateDoc, doc} from 'firebase/firestore';

export default class UpdateMovieButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen: false,
          title: props.initialTitle,
          description: props.initialDescription,
          releaseDate: props.initialReleaseDate,
         
        };
      }
      handleInputChange =(e)=>{
        this.setState({[e.target.name]:e.target.value})
      }
    updateMovie =(id)=>{    
        const {title,releaseDate,description} =this.state;
        const movieDocument= doc(db, "movies", id)
        const updatedMovieData={
            title: title,
            releaseDate: releaseDate,
            description: description,
        }
        updateDoc(movieDocument,updatedMovieData)
        .then((update)=>{console.log(update);
         this.props.fetchMovies();
        }
        )
        .catch((error)=>console.error(error))
       
        
    }
    handlePopUp= ()=>{
        this.setState({ isModalOpen: true });

    }
    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
        window.location.reload()
      };
  render() {
    const { isModalOpen } = this.state;
    const {title,releaseDate,description} =this.state;
    const createdBy = this.props.createdBy;
    const authenticatedUser = auth.currentUser;

    // Check if the authenticated user ID matches the createdBy value
    const isOwner = authenticatedUser && authenticatedUser.uid === createdBy;
    return (
      <div className="update">
      {isOwner && <a onClick={this.handlePopUp} > <i class="fa fa-edit"></i> </a>}
      {isModalOpen && (
        <div className="modal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.updateMovie(this.props.id);
            }}
          >
            <div className="modal-content">
              <span className="close" onClick={this.handleCloseModal}>
                &times;
              </span>

              <h2>Update Movie</h2>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={this.handleInputChange}
                ></textarea>
              </div>

              <div>
                <label htmlFor="releaseDate">Release Date:</label>
                <input
                  type="number"
                  id="releaseDate"
                  name="releaseDate"
                  value={releaseDate}
                  onChange={this.handleInputChange}
                />
              </div>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
    )
  }
}
