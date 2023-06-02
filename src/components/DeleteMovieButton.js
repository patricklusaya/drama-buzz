import React, { Component } from 'react'
import { deleteDoc, doc} from 'firebase/firestore';
import { db, auth } from './config/firebase';

export default class DeleteMovieButton extends Component {
    
    handleDelete= ()=>{
        const { id, deleteMovie } = this.props;
       const refMovie = doc(db,"movies",id);
       deleteDoc(refMovie)
       .then(console.log('movie deleted'))
       .catch((error)=> console.error(error))
       
    }
  render() {
    const createdBy = this.props.createdBy;
    const authenticatedUser = auth.currentUser;

    // Check if the authenticated user ID matches the createdBy value
    const isOwner = authenticatedUser && authenticatedUser.uid === createdBy;
    return (
      
      <div>
      {isOwner &&
        <a onClick={()=>this.handleDelete(this.props.id)}><i class="fa fa-trash"></i></a>
      }
    
      </div>
    )
  }
}
