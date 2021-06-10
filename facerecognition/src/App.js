import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    })
  }

  // function to get the face location & draw the box around face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  // function to keep track of changes in the input
  handleInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  // this fxn will handle submitting the input for image detection
  handleImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://backface.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.parse({
          input: this.state.input
        })
      })
      .then(response => response.json() )
      .then( response => {
        if (response) {
          fetch('https://backface.herokuapp.com/image', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then( response => response.json() )
          .then( count => {
            this.setState( Object.assign(this.state.user, { entries: count }) )
          })
          .catch(err => console.log(err))
        }
        this.displayFaceBox ( this.calculateFaceLocation(response) )
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              handleInputChange={this.handleInputChange} 
              handleImageSubmit={this.handleImageSubmit} 
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </>
          :
          (
            route === 'signin' ? 
              <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> 
              :
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
