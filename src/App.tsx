import React from 'react';
import logo from './logo.svg';
import './App.css';

//BG
import bgImage from './assets/textures/bg-dark-scale.png';
import { NavBar } from './components/Common/Navigation/NavBar';

function App() {
  return (
    <div className="w-full h-full bg-paragon-grid bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}>

      <NavBar />

    </div>
  );
}

export default App;
