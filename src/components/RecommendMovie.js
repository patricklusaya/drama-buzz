import React, { Component } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

class RecommendMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      releaseDate: 0,
      wonOscar: false,
      movieImage: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    if (name === "releaseDate") {
      this.setState({ [name]: parseInt(inputValue, 10) });
    } else if (name === "movieImage") {
      const file = e.target.files[0];
      this.setState({ movieImage: file });
    } else {
      this.setState({ [name]: inputValue });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, releaseDate, description, wonOscar, movieImage } =
      this.state;
    const movieCollection = collection(db, "movies");
    const movieImagesFolderRef = ref(
      storage,
      `movieImagesFolder/${movieImage.name}`
    );
    const uploadImage = uploadBytes(movieImagesFolderRef, movieImage);
    uploadImage
      .then((snapshot) => {
        return getDownloadURL(movieImagesFolderRef);
      })
      .then((downloadURL) => {
        const movieData = {
          title: title,
          releaseDate: releaseDate,
          description: description,
          wonOscar: wonOscar,
          movieImage: downloadURL,
          userId: auth?.currentUser?.uid,
          recommender: auth?.currentUser?.displayName,
        };

        return addDoc(movieCollection, movieData);
      })
      .then((docRef) => {
        console.log("Movie added:", docRef.id);

        this.setState({
          title: "",
          releaseDate: 0,
          description: "",
          wonOscar: false,
          movieImage: null,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    const { title, releaseDate, description, wonOscar, movieImage } =
      this.state;
    return (
      <div className="recommends">
        <div className="recHeader">
          <p className="recHeader-content"></p>
        </div>
        <div className="waveContainer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ff7700"
              fill-opacity="1"
              d="M0,64L6.5,53.3C13,43,26,21,39,37.3C51.9,53,65,107,78,122.7C90.8,139,104,117,117,138.7C129.7,160,143,224,156,250.7C168.6,277,182,267,195,256C207.6,245,221,235,234,240C246.5,245,259,267,272,277.3C285.4,288,298,288,311,282.7C324.3,277,337,267,350,261.3C363.2,256,376,256,389,266.7C402.2,277,415,299,428,304C441.1,309,454,299,467,250.7C480,203,493,117,506,69.3C518.9,21,532,11,545,48C557.8,85,571,171,584,197.3C596.8,224,610,192,623,165.3C635.7,139,649,117,662,112C674.6,107,688,117,701,122.7C713.5,128,726,128,739,133.3C752.4,139,765,149,778,149.3C791.4,149,804,139,817,160C830.3,181,843,235,856,229.3C869.2,224,882,160,895,154.7C908.1,149,921,203,934,213.3C947,224,960,192,973,197.3C985.9,203,999,245,1012,266.7C1024.9,288,1038,288,1051,288C1063.8,288,1077,288,1090,288C1102.7,288,1116,288,1129,266.7C1141.6,245,1155,203,1168,192C1180.5,181,1194,203,1206,197.3C1219.5,192,1232,160,1245,176C1258.4,192,1271,256,1284,234.7C1297.3,213,1310,107,1323,96C1336.2,85,1349,171,1362,170.7C1375.1,171,1388,85,1401,90.7C1414.1,96,1427,192,1434,240L1440,288L1440,0L1433.5,0C1427,0,1414,0,1401,0C1388.1,0,1375,0,1362,0C1349.2,0,1336,0,1323,0C1310.3,0,1297,0,1284,0C1271.4,0,1258,0,1245,0C1232.4,0,1219,0,1206,0C1193.5,0,1181,0,1168,0C1154.6,0,1142,0,1129,0C1115.7,0,1103,0,1090,0C1076.8,0,1064,0,1051,0C1037.8,0,1025,0,1012,0C998.9,0,986,0,973,0C960,0,947,0,934,0C921.1,0,908,0,895,0C882.2,0,869,0,856,0C843.2,0,830,0,817,0C804.3,0,791,0,778,0C765.4,0,752,0,739,0C726.5,0,714,0,701,0C687.6,0,675,0,662,0C648.6,0,636,0,623,0C609.7,0,597,0,584,0C570.8,0,558,0,545,0C531.9,0,519,0,506,0C493,0,480,0,467,0C454.1,0,441,0,428,0C415.1,0,402,0,389,0C376.2,0,363,0,350,0C337.3,0,324,0,311,0C298.4,0,285,0,272,0C259.5,0,246,0,234,0C220.5,0,208,0,195,0C181.6,0,169,0,156,0C142.7,0,130,0,117,0C103.8,0,91,0,78,0C64.9,0,52,0,39,0C25.9,0,13,0,6,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="recommend">
          <form onSubmit={this.handleSubmit} className="form-field">
            <h2 style={{ marginBottom: 0 }}>Hava a Great Movie In Mind ? </h2>
            <div className="subtitle">
              <p>Recommend to The Public</p>
            </div>

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
              <label htmlFor="releaseDate">Release Year:</label>
              <input
                type="number"
                id="releaseDate"
                name="releaseDate"
                value={releaseDate}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="movieImage">Movie Image:</label>
              <input
                type="file"
                id="movieImage"
                name="movieImage"
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ff7700"
            fill-opacity="1"
            d="M0,320L6.5,314.7C13,309,26,299,39,288C51.9,277,65,267,78,250.7C90.8,235,104,213,117,197.3C129.7,181,143,171,156,181.3C168.6,192,182,224,195,234.7C207.6,245,221,235,234,245.3C246.5,256,259,288,272,272C285.4,256,298,192,311,181.3C324.3,171,337,213,350,229.3C363.2,245,376,235,389,245.3C402.2,256,415,288,428,282.7C441.1,277,454,235,467,186.7C480,139,493,85,506,101.3C518.9,117,532,203,545,240C557.8,277,571,267,584,240C596.8,213,610,171,623,160C635.7,149,649,171,662,170.7C674.6,171,688,149,701,144C713.5,139,726,149,739,176C752.4,203,765,245,778,266.7C791.4,288,804,288,817,277.3C830.3,267,843,245,856,213.3C869.2,181,882,139,895,122.7C908.1,107,921,117,934,133.3C947,149,960,171,973,202.7C985.9,235,999,277,1012,261.3C1024.9,245,1038,171,1051,138.7C1063.8,107,1077,117,1090,149.3C1102.7,181,1116,235,1129,250.7C1141.6,267,1155,245,1168,240C1180.5,235,1194,245,1206,245.3C1219.5,245,1232,235,1245,208C1258.4,181,1271,139,1284,112C1297.3,85,1310,75,1323,64C1336.2,53,1349,43,1362,74.7C1375.1,107,1388,181,1401,192C1414.1,203,1427,149,1434,122.7L1440,96L1440,320L1433.5,320C1427,320,1414,320,1401,320C1388.1,320,1375,320,1362,320C1349.2,320,1336,320,1323,320C1310.3,320,1297,320,1284,320C1271.4,320,1258,320,1245,320C1232.4,320,1219,320,1206,320C1193.5,320,1181,320,1168,320C1154.6,320,1142,320,1129,320C1115.7,320,1103,320,1090,320C1076.8,320,1064,320,1051,320C1037.8,320,1025,320,1012,320C998.9,320,986,320,973,320C960,320,947,320,934,320C921.1,320,908,320,895,320C882.2,320,869,320,856,320C843.2,320,830,320,817,320C804.3,320,791,320,778,320C765.4,320,752,320,739,320C726.5,320,714,320,701,320C687.6,320,675,320,662,320C648.6,320,636,320,623,320C609.7,320,597,320,584,320C570.8,320,558,320,545,320C531.9,320,519,320,506,320C493,320,480,320,467,320C454.1,320,441,320,428,320C415.1,320,402,320,389,320C376.2,320,363,320,350,320C337.3,320,324,320,311,320C298.4,320,285,320,272,320C259.5,320,246,320,234,320C220.5,320,208,320,195,320C181.6,320,169,320,156,320C142.7,320,130,320,117,320C103.8,320,91,320
      ,78,320C64.9,320,52,320,39,320C25.9,320,13,320,6,320L0,320Z"
          ></path>
        </svg>
      </div>
    );
  }
}
export default RecommendMovie;
