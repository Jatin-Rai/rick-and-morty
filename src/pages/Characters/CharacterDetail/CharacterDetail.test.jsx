import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import CharacterDetail from './CharacterDetail';
import { useCharacterContext } from '../../../context/CharacterContext';

jest.mock('axios');
jest.mock('../../../context/CharacterContext');

describe('CharacterDetail', () => {
  const mockCharacter = {
    id: 1,
    name: 'Test Character',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Origin Planet', url: 'https://example.com/origin' },
    location: { name: 'Test Location', url: 'https://example.com/location' },
    image: 'https://example.com/image.jpg',
    episode: ['https://example.com/episode/1', 'https://example.com/episode/2'],
    type: 'Test Type',
  };

  const mockLocationData = {
    name: 'Test Location',
    dimension: 'Test Dimension',
    type: 'Test Type',
  };

  const mockOriginData = {
    name: 'Origin Planet',
    dimension: 'Origin Dimension',
    type: 'Origin Type',
  };

  beforeEach(() => {
    useCharacterContext.mockReturnValue({
      results: [mockCharacter],
    });

    axios.get.mockImplementation((url) => {
      if (url === mockCharacter.location.url) {
        return Promise.resolve({ data: mockLocationData });
      } else if (url === mockCharacter.origin.url) {
        return Promise.resolve({ data: mockOriginData });
      }
      return Promise.reject(new Error('Unexpected URL'));
    });
  });

  test('renders character details with correct data', async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={[`/characters/${mockCharacter.id}`]}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Act and Assert
    // Use waitFor to wait for asynchronous rendering and assertions
    await waitFor(() => {
      // Check if the main container is rendered
      expect(screen.getByTestId('character-detail-container')).toBeInTheDocument();
    });

    await waitFor(() => {
      // Check if the character name and species are rendered correctly
      expect(screen.getByTestId('character-name')).toHaveTextContent(`${mockCharacter.name} - ${mockCharacter.species}`);
    });

  });
});
