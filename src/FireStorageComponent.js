import React, { Component } from "react";
import './Image.css'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'

const storage = getStorage()
const storageRef = ref(storage,'saree')

class FireStorageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null
    };

   // if we are using arrow function binding is not required
//    this.onImageChange = this.onImageChange.bind(this);
    this.handleGetUrl = this.handleGetUrl.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];

        uploadBytes(storageRef, img).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
  };

  handleGetUrl() {
    getDownloadURL(storageRef)
    .then((url) => {
        //console.log(url)
        this.setState({
            imageSrc:url
        })
    })
    .catch((e) => {
        console.log("Error while getting DownloadURL : ",e)
    })
  }

  render() {
    return (
        <div>
            <img className='img' src={this.state.imageSrc} />
            <h1>Select Image</h1>
            {false?<input type="file" name="myImage" onChange={this.onImageChange} />:null}
            <div>
            <button 
                onClick={this.handleGetUrl}
            >getUrl</button>
            </div>
        </div>
    );
  }
}
export default FireStorageComponent;