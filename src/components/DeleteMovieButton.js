import React, { Component } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "./config/firebase";

export default class DeleteMovieButton extends Component {
  handleDelete = () => {
    const { id, deleteMovie } = this.props;
    const refMovie = doc(db, "movies", id);

    // Show confirmation alert to confirm deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (confirmDelete) {
      deleteDoc(refMovie)
        .then(() => {
          console.log("Movie deleted");
          deleteMovie(id); 
        })
        .catch((error) => console.error(error));
    }
  };
  render() {
    const createdBy = this.props.createdBy;
    const authenticatedUser = auth.currentUser;

    const isOwner = authenticatedUser && authenticatedUser.uid === createdBy;
    return (
      <div>
        {isOwner && (
          <a
            onClick={() => this.handleDelete(this.props.id)}
            style={{ cursor: "pointer" }}
          >
            <i class="fa fa-trash"></i>
          </a>
        )}
      </div>
    );
  }
}
