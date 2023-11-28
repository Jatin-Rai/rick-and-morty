// Import necessary libraries
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create a context to share state between components
const CharacterContext = createContext();

// Create a provider component to manage the shared state
const CharacterProvider = ({ children }) => {
  // Define state variables using the useState hook
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [species, setSpecies] = useState('');
  const [search, setSearch] = useState('');
  const [fetchedData, setFetchedData] = useState([]);

  // Construct the API URL based on state variables
  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Initialize a variable to track whether the component is still mounted
    let isMounted = true;

    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        // Make a GET request to the API using Axios
        const { data } = await axios.get(api);

        // Check if the component is still mounted before updating the state
        if (isMounted) {
          setFetchedData(data);
        }
      } catch (error) {
        // Handle errors that may occur during the data fetching process
        throw new Error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [api]); // The useEffect hook will re-run whenever the API URL changes

  // Destructure the relevant values from the fetchedData state
  const { info, results } = fetchedData;

  // Check if results (characters data) is available before rendering
  if (!results || results.length === 0) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  // Create an object containing the state variables and functions to update them
  const contextValue = {
    pageNumber,
    setPageNumber,
    status,
    setStatus,
    gender,
    setGender,
    species,
    setSpecies,
    search,
    setSearch,
    info,
    results,
    fetchedData,
  };

  // Provide the context value to the wrapped components
  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
};

// Create a custom hook to easily consume the context in functional components
const useCharacterContext = () => {
  const context = useContext(CharacterContext);

  // Throw an error if the hook is used outside of a CharacterProvider
  if (!context) {
    throw new Error('useCharacterContext must be used within CharacterProvider');
  }

  // Return the context object
  return context;
};

// Export the provider and custom hook for use in other components
export { CharacterProvider, useCharacterContext };
