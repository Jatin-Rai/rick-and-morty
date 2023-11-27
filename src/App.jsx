import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CharacterProvider } from './context/CharacterContext';
import { Home, Characters, Episodes, Locations, CharacterDetail } from './pages';
import { Navbar } from './components';

function App() {
  return (
    <CharacterProvider>
      <BrowserRouter>
        {/* Add data-testid attribute for testing */}
        <Navbar data-testid="navbar-component" />

        <Routes>
          {/* Add data-testid attributes for testing */}
          <Route path="/" exact element={<Home data-testid="home-component" />} />
          <Route path="/characters" exact element={<Characters data-testid="characters-component" />} />
          <Route path="/characters/:id" exact element={<CharacterDetail data-testid="character-detail-component" />} />
          <Route path="/episodes" exact element={<Episodes data-testid="episodes-component" />} />
          <Route path="/locations" exact element={<Locations data-testid="locations-component" />} />
        </Routes>
      </BrowserRouter>
    </CharacterProvider>
  );
}

export default App;
