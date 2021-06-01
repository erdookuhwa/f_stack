import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';

// My clarifai's API key
const app = new Clarifai.App({
  apiKey: '0e3bef19a40045b5ad2cf8074b70b620'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  // function to get the face location & draw the box around face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box})
  }

  // function to keep track of changes in the input
  handleInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  // this fxn will handle submitting the input for image detection
  handleImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then( response => this.displayFaceBox ( this.calculateFaceLocation(response) ) )
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({route: route});
  }
  
  render() {
    const { imageUrl, route, box, isSignedIn } = this.state;
    return (
      <div className="App">
        {/* <Particles className='particles' /> */}
        <ParticlesBg color='#00ffff' className='particlesbg' type='cobweb' bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { route === 'home' ? 
          <>
            <Logo />
            <Rank />
            <ImageLinkForm 
              handleInputChange={this.handleInputChange} 
              handleImageSubmit={this.handleImageSubmit} 
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </>
          :
          (
            route === 'signin' ? 
              <SignIn onRouteChange={this.onRouteChange} /> 
              :
              <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }

}

export default App;
