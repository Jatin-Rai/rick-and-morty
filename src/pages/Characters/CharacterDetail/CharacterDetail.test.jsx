import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CharacterDetail from './CharacterDetail';
import { CharacterProvider } from '../../../context/CharacterContext';

// Mock the context provider
jest.mock('../../../context/CharacterContext', () => ({
  ...jest.requireActual('../../../context/CharacterContext'),
  useCharacterContext: jest.fn(() => ({
    results: [
      {
        id: 1,
        name: 'Test Character',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { url: 'https://rickandmortyapi.com/api/location/1' },
        location: { url: 'https://rickandmortyapi.com/api/location/2', residents: [] },
        image: 'test-image.jpg',
        episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
        type: 'Test Type',
      },
    ],
  })),
}));

test('renders CharacterDetail component', () => {
  render(
    <MemoryRouter initialEntries={['/characters/1']}>
      <Route path="/characters/:id">
        <CharacterProvider>
          <CharacterDetail />
        </CharacterProvider>
      </Route>
    </MemoryRouter>
  );

  // Check if the main container is rendered (using data-testid attribute)
  const characterDetailContainer = screen.getByTestId('character-detail-container');
  expect(characterDetailContainer).toBeInTheDocument();

  // Check if the character name is rendered (using data-testid attribute)
  const characterName = screen.getByTestId('character-name');
  expect(characterName).toBeInTheDocument();

  // Check if the character image is rendered (using data-testid attribute)
  const characterImage = screen.getByTestId('character-image');
  expect(characterImage).toBeInTheDocument();

  // Check if the character details are rendered (using data-testid attribute)
  const characterDetails = screen.getByTestId('character-details');
  expect(characterDetails).toBeInTheDocument();

  // Check if the episodes container is rendered (using data-testid attribute)
  const episodesContainer = screen.getByTestId('episodes-container');
  expect(episodesContainer).toBeInTheDocument();

  // You can add more specific checks based on your component structure
  // For example, check if specific episode names are rendered
  expect(screen.getByTestId('episode-0')).toBeInTheDocument();
  expect(screen.getByTestId('episode-1')).toBeInTheDocument();
});

test('renders "Character not found" message when character is not found', () => {
  render(
    <MemoryRouter initialEntries={['/characters/2']}>
      <Route path="/characters/:id">
        <CharacterProvider>
          <CharacterDetail />
        </CharacterProvider>
      </Route>
    </MemoryRouter>
  );

  // Check if the "Character not found" message is rendered (using data-testid attribute)
  const characterNotFoundMessage = screen.getByTestId('character-not-found');
  expect(characterNotFoundMessage).toBeInTheDocument();
});
