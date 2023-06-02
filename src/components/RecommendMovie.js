import React, { Component } from 'react'
import { addDoc , collection} from 'firebase/firestore';
import { db , auth} from './config/firebase';
 class RecommendMovie extends Component {

    constructor(props){
        super(props)
        this.state={
            title:'',
            description:'',
            releaseDate:0,
            wonOscar:false,
        }
    }
   
    handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
    
        this.setState({ [name]: inputValue });
      };
    handleSubmit = (e)=>{
        e.preventDefault()
        const {title,releaseDate,description,wonOscar} =this.state;
        const movieCollection = collection(db, "movies");
       
  const movieData = {
    title: title,
    releaseDate: releaseDate,
    description: description,
    wonOscar: wonOscar,
    userId:auth?.currentUser?.uid
  };

  addDoc(movieCollection, movieData)
    .then((sentData) => {
      console.log("Movie added:", sentData.id);
      
      this.setState({
        title: "",
        releaseDate: "",
        description: "",
        wonOscar: false,
      });
    })
        .catch((error)=>{
            console.error(error);
        })
    }
  render() {
 
    const {title,releaseDate,description,wonOscar} =this.state;
    return (
    <div>
      <div className="recHeader">
  <p className="recHeader-content">
    Help people out. Recommend a great movie for them to watch 😎
  </p>
</div>

      <div className='recommend'>
        
        <form onSubmit={this.handleSubmit} className="form-field">
          
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

        <div>
          <label htmlFor="wonOscar">Won Oscar:</label>
          <input
            type="checkbox"
            id="wonOscar"
            name="wonOscar"
            checked={wonOscar}
            onChange={this.handleInputChange}
            className="inline-input"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
        
      </div>
      </div>

    )
  }
}
export default RecommendMovie;
