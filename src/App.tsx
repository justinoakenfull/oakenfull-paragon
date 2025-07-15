import React from 'react';
import './App.css';

//BG
import bgImage from './assets/textures/bg-dark-scale.png';
import { NavBar } from './components/Common/Navigation/NavBar';

// Pages
import { Hero } from './components/Hero/Hero';
import { Projects } from './components/Projects/Projects';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Skills } from './components/Skills/Skills';

type Page = "Home" | "Projects" | "About" | "Contact" | "Skills";

function App() {

  const [activePage, setActivePage] = React.useState<Page>('Home');
  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <Hero />;
      case 'Projects':
        return <Projects />;
      case 'About':
        return <About />;
      case 'Contact':
        return <Contact />;
      case 'Skills':
        return <Skills />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className='bg-paragon-grid h-screen'>
      <div>
        <NavBar activeItem={activePage} onChange={setActivePage} />
      </div>
      <div className="content-container">
        <div className="content">
          {renderPage()}
        </div>
      </div>
    </div >

  );
}

export default App;
