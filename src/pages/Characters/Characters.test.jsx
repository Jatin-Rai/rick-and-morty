import React from 'react';
import { render, screen } from '@testing-library/react';
import Characters from './Characters';
import { CharacterProvider } from '../../context/CharacterContext';

// Mock the context provider
jest.mock('../../context/CharacterContext', () => ({
  ...jest.requireActual('../../context/CharacterContext'),
  useCharacterContext: jest.fn(() => ({
    results: [
      { id: 1, name: 'Character 1', gender: 'Male', species: 'Human', status: 'Alive' },
      { id: 2, name: 'Character 2', gender: 'Female', species: 'Alien', status: 'Dead' },
    ],
    setSearch: jest.fn(),
    setPageNumber: jest.fn(),
    gender: 'Male',
    setGender: jest.fn(),
    species: 'Human',
    setSpecies: jest.fn(),
    status: 'Alive',
    setStatus: jest.fn(),
  })),
}));

test('renders Characters component', () => {
  render(
    <CharacterProvider>
      <Characters />
    </CharacterProvider>
  );

  // Check if the main container is rendered (using data-testid attribute)
  const charactersElement = screen.getByTestId('characters-component');
  expect(charactersElement).toBeInTheDocument();

  // Check if the search component is rendered (using data-testid attribute)
  const searchElement = screen.getByTestId('search-component');
  expect(searchElement).toBeInTheDocument();

  // Check if the gender filter component is rendered (using data-testid attribute)
  const genderFilter = screen.getByTestId('gender-filter');
  expect(genderFilter).toBeInTheDocument();

  // Check if the species filter component is rendered (using data-testid attribute)
  const speciesFilter = screen.getByTestId('species-filter');
  expect(speciesFilter).toBeInTheDocument();

  // Check if the status filter component is rendered (using data-testid attribute)
  const statusFilter = screen.getByTestId('status-filter');
  expect(statusFilter).toBeInTheDocument();

  // Check if the pagination component is rendered (using data-testid attribute)
  const paginationElement = screen.getByTestId('pagination-component');
  expect(paginationElement).toBeInTheDocument();

  // You can add more specific checks based on your component structure
  // For example, check if specific characters are rendered
  expect(screen.getByText('Character 1')).toBeInTheDocument();
  expect(screen.getByText('Character 2')).toBeInTheDocument();
});
