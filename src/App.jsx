import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Characters, Episodes, Locations, CharacterDetail } from './pages';
import { Navbar } from './components';

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/characters" exact element={<Characters />} />
          <Route path="/characters/:id" exact element={<CharacterDetail />} />
          <Route path="/episodes" exact element={<Episodes />} />
          <Route path="/locations" exact element={<Locations />} />
        </Routes>
    </>
  );
}

export default App;
