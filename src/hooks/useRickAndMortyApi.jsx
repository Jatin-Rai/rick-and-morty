import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * A custom hook for fetching Rick and Morty API data.
 * @param {string} endpoint - The API endpoint ('episode' or 'location').
 * @param {number} id - The ID for the specific episode or location.
 * @param {string} searchQuery - The search query for filtering characters by name.
 * @returns {Object} An object containing information and charactersData.
 */
const useRickAndMortyApi = (endpoint, id, searchQuery) => {
  const [info, setInfo] = useState([]);
  const [charactersData, setCharactersData] = useState([]);

  // Construct the API URL based on the endpoint, ID, and searchQuery
  const api = `https://rickandmortyapi.com/api/${endpoint}/${id}${
    searchQuery ? `?name=${searchQuery}` : ''
  }`;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Fetch data from the Rick and Morty API
        const { data } = await axios.get(api);
        setInfo(data);
        
        // If the endpoint is 'episode', fetch characters data
        if (isMounted && endpoint === 'episode') {
          const fetchedCharactersData = await Promise.all(
            data.characters.map(async (characterUrl) => {
              const { data } = await axios.get(characterUrl);
              return data;
            })
          );

          // Filter characters based on search query
          const filteredCharacters = fetchedCharactersData.filter((character) =>
            character.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          setCharactersData(filteredCharacters);
        }

        // If the endpoint is 'location', fetch residents data
        if (isMounted && endpoint === 'location') {
          const fetchedCharactersData = await Promise.all(
            data.residents.map(async (characterUrl) => {
              const { data } = await axios.get(characterUrl);
              return data;
            })
          );

          // Filter characters based on search query
          const filteredCharacters = fetchedCharactersData.filter((character) =>
            character.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          setCharactersData(filteredCharacters);
        }
      } catch (error) {
        console.log('Error fetching data - ', error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [api, endpoint, id, searchQuery]);

  // Return the fetched information and charactersData
  return { info, charactersData };
};

export default useRickAndMortyApi;
