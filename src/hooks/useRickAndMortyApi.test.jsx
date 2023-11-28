import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import useRickAndMortyApi from './useRickAndMortyApi';

// Mock axios for the test
jest.mock('axios');

// Use fake timers
jest.useFakeTimers();

describe('useRickAndMortyApi', () => {
  it('fetches data and sets state correctly for episode endpoint', async () => {
    // Mock axios response for episode endpoint
    const episodeData = {
      data: {
        characters: ['characterUrl1', 'characterUrl2'],
      },
    };

    // Mock axios response for characterUrl1
    const characterData1 = { data: { name: 'Character1' } };

    // Mock axios response for characterUrl2
    const characterData2 = { data: { name: 'Character2' } };

    // Set up axios mock implementation
    axios.get.mockResolvedValueOnce(episodeData);
    axios.get.mockResolvedValueOnce(characterData1);
    axios.get.mockResolvedValueOnce(characterData2);

    // Render the hook with the necessary parameters
    const { result, waitFor } = renderHook(() => useRickAndMortyApi('episode', 1, 'Character'));

    // Fast-forward timers to ensure quick resolution of promises
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Wait for the asynchronous fetchData function to complete
    await waitFor(() => result.current.info.characters.length > 0);

    // Assert that the hook sets the state correctly
    expect(result.current.info).toEqual(episodeData.data);
    expect(result.current.charactersData).toEqual([characterData1.data, characterData2.data]);
  });

  it('fetches data and sets state correctly for location endpoint', async () => {
    // Mock axios response for location endpoint
    const locationData = {
      data: {
        residents: ['residentUrl1', 'residentUrl2'],
      },
    };

    // Mock axios response for residentUrl1
    const residentData1 = { data: { name: 'Resident1' } };

    // Mock axios response for residentUrl2
    const residentData2 = { data: { name: 'Resident2' } };

    // Set up axios mock implementation
    axios.get.mockResolvedValueOnce(locationData);
    axios.get.mockResolvedValueOnce(residentData1);
    axios.get.mockResolvedValueOnce(residentData2);

    // Render the hook with the necessary parameters
    const { result, waitFor } = renderHook(() => useRickAndMortyApi('location', 1, 'Resident'));

    // Fast-forward timers to ensure quick resolution of promises
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Wait for the asynchronous fetchData function to complete
    await waitFor(() => result.current.info.residents.length > 0);

    // Assert that the hook sets the state correctly
    expect(result.current.info).toEqual(locationData.data);
    expect(result.current.charactersData).toEqual([residentData1.data, residentData2.data]);
  });
});
