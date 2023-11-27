import React from 'react';
import { Card, Filter, Pagination, Search } from '../../components';
import { useCharacterContext } from '../../context/CharacterContext';
import style from "./Characters.module.css";
import { Link } from 'react-router-dom';

const Characters = () => {
  // Access state variables and functions from the context
  const { results, setSearch, setPageNumber, gender, setGender, species, setSpecies, status, setStatus } = useCharacterContext();

  // Define options for filter menus
  const genders = ["Male", "Female", "genderless", "unknown"];
  const speciesMenu = [
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
    "Planet",
  ];
  const statusMenu = ["Alive", "Dead", "Unknown"];

  return (
    <div className={style.characters} data-testid="characters-component">
      {/* Search component for character search */}
      <Search setSearch={setSearch} setPageNumber={setPageNumber} data-testid="search-component" />

      <div className={style.filters}>
        {/* Filter component for gender */}
        <Filter value={gender} onChange={(e) => setGender(e.target.value)} data={genders} placeholder="Gender" data-testid="gender-filter" />

        {/* Filter component for species */}
        <Filter value={species} onChange={(e) => setSpecies(e.target.value)} data={speciesMenu} placeholder="Species" data-testid="species-filter" />

        {/* Filter component for status */}
        <Filter value={status} onChange={(e) => setStatus(e.target.value)} data={statusMenu} placeholder="Status" data-testid="status-filter" />
      </div>

      <h1>
        Characters
        {/* Pagination component for navigating through pages */}
        <Pagination data-testid="pagination-component" />
      </h1>

      <div className="cardLayout">
        {/* Map through characters and display a Card component for each */}
        {results.map((character) => (
          <Link key={character.id} to={`/characters/${character.id}`}>
            <Card character={character} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Characters;
