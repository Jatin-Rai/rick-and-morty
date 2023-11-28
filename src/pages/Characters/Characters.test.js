import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Characters from './Characters';
import { useCharacterContext } from '../../context/CharacterContext';

// Mock the CharacterProvider to provide required context values
jest.mock('../../context/CharacterContext', () => ({
  ...jest.requireActual('../../context/CharacterContext'),
  useCharacterContext: jest.fn(),
}));

describe('Characters', () => {
  test('renders without errors', () => {
    // Mock the context values
    const mockContextValues = {
      results: [],
      setSearch: jest.fn(),
      setPageNumber: jest.fn(),
      gender: '',
      setGender: jest.fn(),
      species: '',
      setSpecies: jest.fn(),
      status: '',
      setStatus: jest.fn(),
    };

    // Mock the useCharacterContext hook to return the mock context values
    useCharacterContext.mockReturnValue(mockContextValues);

    // Render the Characters component inside a MemoryRouter and CharacterProvider
    render(
      <MemoryRouter>
        <Characters />
      </MemoryRouter>
    );

    // Check if the component renders without errors
    const charactersContainer = screen.getByTestId('characters-container');

    expect(charactersContainer).toBeInTheDocument();
  });
});
