import React, { useState, useEffect } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';

function App() {
  const [ input, setInput ] = useState('');

  // function to keep track on changes in the input
  const handleInputChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value)
  }

  // this fxn will handle submitting the input for image detection
  const handleImageSubmit = (e) => {
    e.preventDefault();
    console.log('image is submitted for processing!')
  }

  return (
    <div className="App">
      <Particles className='particles' />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        handleInputChange={handleInputChange} 
        handleImageSubmit={handleImageSubmit} 
      />
      <FaceRecognition />
    </div>
  );
}

export default App;
