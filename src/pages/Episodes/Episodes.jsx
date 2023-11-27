import React, { useState } from 'react';
import { Card, Search } from '../../components';
import style from './Episodes.module.css';
import useRickAndMortyApi from '../../hooks/useRickAndMortyApi';

const Episodes = () => {

  // State variables for episode ID and search query
  const [id, setId] = useState(1);
  const [search, setSearch] = useState("");


  // Custom hook to fetch episode data based on ID and search query
  const { info, charactersData } = useRickAndMortyApi('episode', id, search);

  // Destructure relevant data from the API response (with conditional check)
  const { air_date, name, episode } = info;

  return (
    <div className={style.episode}>
      {/* Display episode name and number */}
      <h1>
        Episode Name: <span>{name === "" ? "Unknown" : name}({episode})</span>
      </h1>

      {/* Display airing date of the episode */}
      <p>
        Aired on - <span>{air_date === "" ? "Unknown" : air_date}</span>
      </p>

      {/* Search component for filtering characters in the episode */}
      <Search setSearch={setSearch} />

      <div className={style.filter}>
        {/* Dropdown to select episode ID */}
        <select
          className="form-select"
          onChange={(e) => setId(e.target.value)}
          value={id}
        >
          {Array.from({ length: 51 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              Episode - {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="cardLayout">
        {/* Map through charactersData and display Card component for each character */}
        {charactersData.map((character) => (
          <div key={character.id}>
            <Card character={character} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
