import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { CharacterProvider } from '../../context/CharacterContext';
import Episodes from './Episodes';

// Mock the useRickAndMortyApi hook
jest.mock('../../hooks/useRickAndMortyApi', () => ({
  __esModule: true,
  default: jest.fn(() => ({ info: {}, charactersData: [] })),
}));

describe('Episodes', () => {
  test('renders Episodes component with episode information, search, and filter', () => {
    render(
      <CharacterProvider>
        <MemoryRouter initialEntries={['/episodes']}>
          <Route path="/episodes">
            <Episodes />
          </Route>
        </MemoryRouter>
      </CharacterProvider>
    );

    // Check if episode name and number are rendered
    expect(screen.getByText(/Episode Name/)).toBeInTheDocument();
    expect(screen.getByText(/Aired on/)).toBeInTheDocument();

    // Check if Search component is rendered
    expect(screen.getByTestId('mockSearch')).toBeInTheDocument();

    // Check if episode ID dropdown is rendered
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    // Check if Card components are rendered for each character
    expect(screen.getAllByTestId('mockCard')).toHaveLength(0); // Assuming no charactersData for initial render
  });

  test('handles episode ID change and search input', () => {
    // Mock the useRickAndMortyApi hook to return specific data
    useRickAndMortyApi.mockReturnValue({
      info: {
        air_date: '2023-01-01',
        name: 'Test Episode',
        episode: 'S01E01',
      },
      charactersData: [{ id: 1, name: 'Character 1' }],
    });

    render(
      <CharacterProvider>
        <MemoryRouter initialEntries={['/episodes']}>
          <Route path="/episodes">
            <Episodes />
          </Route>
        </MemoryRouter>
      </CharacterProvider>
    );

    // Change the episode ID
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: '2' } });

    // Check if setId function is called with the correct value
    expect(useRickAndMortyApi).toHaveBeenCalledWith('episode', '2', '');

    // Change the search input
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Morty' } });

    // Check if setSearch function is called with the correct value
    expect(useRickAndMortyApi).toHaveBeenCalledWith('episode', '2', 'Morty');
  });
});
