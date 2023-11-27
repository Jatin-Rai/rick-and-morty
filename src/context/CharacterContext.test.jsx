import React from 'react';
import { render, act } from '@testing-library/react';
import { CharacterProvider, useCharacterContext } from './CharacterContext';
import axios from 'axios';

// Mock Axios for testing
jest.mock('axios');

// Mock Axios response data
const mockData = {
  info: { pages: 1 },
  results: [{ id: 1, name: 'Character 1' }],
};

describe('CharacterProvider and useCharacterContext', () => {
  test('provides context values to children', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    let component;

    await act(async () => {
      component = render(
        <CharacterProvider>
          <TestComponent />
        </CharacterProvider>
      );
    });

    // Check if the context values are provided to the children
    const characterNameElement = component.getByText('Character 1');
    expect(characterNameElement).toBeInTheDocument();
  });

  test('updates context values on state changes', async () => {
    axios.get.mockResolvedValueOnce({ data: mockData });

    let component;

    await act(async () => {
      component = render(
        <CharacterProvider>
          <TestComponent />
        </CharacterProvider>
      );
    });

    // Check if the initial context values are rendered
    const characterNameElement = component.getByText('Character 1');
    expect(characterNameElement).toBeInTheDocument();

    // Update state values to trigger a re-fetch
    act(() => {
      component.getByTestId('updateStateButton').click();
    });

    // Check if the updated context values are rendered after re-fetch
    const updatedCharacterNameElement = component.getByText('Updated Character');
    expect(updatedCharacterNameElement).toBeInTheDocument();
  });
});

const TestComponent = () => {
  const {
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
  } = useCharacterContext();

  const handleStateUpdate = () => {
    // Update state values to trigger a re-fetch
    setPageNumber(2);
    setStatus('Dead');
    setGender('Male');
    setSpecies('Human');
    setSearch('Updated Search');
  };

  return (
    <div>
      <p>{results[0].name}</p>
      <button onClick={handleStateUpdate} data-testid="updateStateButton">
        Update State
      </button>
    </div>
  );
};
