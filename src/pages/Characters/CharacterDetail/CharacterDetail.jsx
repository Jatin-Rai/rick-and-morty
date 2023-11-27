import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCharacterContext } from '../../../context/CharacterContext';
import style from './CharacterDetail.module.css';
import axios from 'axios';

const CharacterDetail = () => {
  // Get the character ID from the route parameters
  const { id } = useParams();

  // Access character data from the context
  const { results: characters } = useCharacterContext();

  // Find the specific character based on the ID
  const character = characters.find((char) => char.id === Number(id));

  // State to store episode names, location data, and origin data
  const [episodeNames, setEpisodeNames] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [originData, setOriginData] = useState([]);

  // Destructure character data
  const { name, status, species, gender, origin, location, image, episode, type } = character;

  // useEffect to fetch additional data when the component mounts
  useEffect(() => {
    // Function to fetch episode names
    const fetchEpisodeNames = async () => {
      try {
        const episodePromises = episode.map((episodeUrl) => axios.get(episodeUrl));
        const episodeResponses = await Promise.all(episodePromises);
        const episodeData = episodeResponses.map((response) => response.data);
        setEpisodeNames(episodeData.map((episode) => episode.name));
      } catch (error) {
        console.error('Error fetching episode data:', error);
      }
    };

    // Function to fetch location data
    const fetchLocationData = async () => {
      try {
        if (location && location.url) {
          const locationResponse = await axios.get(location.url);
          setLocationData(locationResponse.data);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    // Function to fetch origin data
    const fetchOriginData = async () => {
      try {
        if (origin && origin.url) {
          const originResponse = await axios.get(origin.url);
          setOriginData(originResponse.data);
        }
      } catch (error) {
        console.error('Error fetching origin data:', error);
      }
    };

    // Check if character data is available before fetching additional data
    if (character) {
      fetchEpisodeNames();
      fetchLocationData();
      fetchOriginData();
    }
  }, [episode, character, location, origin]);

  // Return a message if the character is not found
  if (!character) {
    return <p data-testid="character-not-found">Character not found</p>;
  }

  // Destructure additional data
  const { name: locationName, dimension: locationDimension, type: locationType } = locationData;
  const { name: originName, dimension: originDimension, type: originType } = originData;

  // Render the character details component
  return (
    <div className={style.container} data-testid="character-detail-container">
      <h1 data-testid="character-name">{name} - {species}</h1>
      <img src={image} alt={name} className={style.characterImage} data-testid="character-image" />
      <div className={style.details} data-testid="character-details">
        <p>Gender: {gender}</p>
        <p>Status: {status}</p>
        {type && <p>Type: {type}</p>}
        <p>Residents Count: {location.residents ? locationData.residents.length : 'unknown'}</p>
        <p>Origin: {originName}</p>
        <p>Origin Dimension: {originDimension}</p>
        <p>Origin Type: {originType}</p>
        <p>Location: {locationName}</p>
        <p>Location Dimension: {locationDimension}</p>
        <p>Location Type: {locationType}</p>
      </div>

      <div className={style.episodes} data-testid="episodes-container">
        <h2>Episodes:</h2>
        <ul>
          {episodeNames.map((episodeName, index) => (
            <li key={episodeName + index} data-testid={`episode-${index}`}>
              {episodeName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetail;
