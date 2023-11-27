import React, { useState } from 'react';
import { Card, Search } from '../../components';
import style from './Locations.module.css';
import useRickAndMortyApi from '../../hooks/useRickAndMortyApi';

const Locations = () => {
  // State variables for location ID and search query
  const [id, setId] = useState(1);
  const [search, setSearch] = useState("");

  // Custom hook to fetch location data
  const { info, charactersData } = useRickAndMortyApi('location', id, search);

  // Destructuring location information
  const { dimension, name, type } = info;

  return (
    <div className={style.location} data-testid="locations-component">
      {/* Location name heading */}
      <h1>
        Location: <span data-testid="location-name">{name === "" ? "Unknown" : name}</span>
      </h1>

      <div className={style.description}>
        {/* Dimension information */}
        <p>
          Dimension: <span data-testid="location-dimension">{dimension === "" ? "Unknown" : dimension}</span>
        </p>

        {/* Type information */}
        <p>
          Type: <span data-testid="location-type">{type === "" ? "Unknown" : type}</span>
        </p>
      </div>

      {/* Search component */}
      <Search setSearch={setSearch} data-testid="search-component" />

      <div className={style.filter}>
        {/* Dropdown for selecting location ID */}
        <select
          className="form-select"
          onChange={(e) => setId(e.target.value)}
          value={id}
          data-testid="location-id-select"
        >
          {Array.from({ length: 126 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              Location - {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="cardLayout" data-testid="characters-card-layout">
        {/* Display cards for characters in the location */}
        {charactersData.map((character) => (
          <div key={character.id}>
            <Card character={character} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
