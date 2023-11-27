import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';
import useRickAndMortyApi from './useRickAndMortyApi';

// Mock Axios for testing
jest.mock('axios');

describe('useRickAndMortyApi', () => {
  test('fetches data for episodes', async () => {
    const mockEpisodeData = {
      characters: ['https://rickandmortyapi.com/api/character/1'],
    };

    const mockCharacterData = {
      id: 1,
      name: 'Rick Sanchez',
    };

    axios.get.mockImplementationOnce((url) => {
      if (url.includes('episode')) {
        return Promise.resolve({ data: mockEpisodeData });
      } else {
        return Promise.resolve({ data: mockCharacterData });
      }
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useRickAndMortyApi('episode', 1, 'Rick')
    );

    await waitForNextUpdate();

    expect(result.current.info).toEqual(mockEpisodeData);
    expect(result.current.charactersData).toEqual([mockCharacterData]);
  });

  test('fetches data for locations', async () => {
    const mockLocationData = {
      residents: ['https://rickandmortyapi.com/api/character/1'],
    };

    const mockCharacterData = {
      id: 1,
      name: 'Rick Sanchez',
    };

    axios.get.mockImplementationOnce((url) => {
      if (url.includes('location')) {
        return Promise.resolve({ data: mockLocationData });
      } else {
        return Promise.resolve({ data: mockCharacterData });
      }
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useRickAndMortyApi('location', 1, 'Rick')
    );

    await waitForNextUpdate();

    expect(result.current.info).toEqual(mockLocationData);
    expect(result.current.charactersData).toEqual([mockCharacterData]);
  });

  test('handles errors during data fetching', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch data'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useRickAndMortyApi('episode', 1, 'Rick')
    );

    await waitForNextUpdate();

    expect(result.current.info).toEqual([]);
    expect(result.current.charactersData).toEqual([]);
  });
});
