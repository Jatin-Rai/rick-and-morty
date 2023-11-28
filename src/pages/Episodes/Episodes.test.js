// Episodes.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Episodes from './Episodes';
import useRickAndMortyApi from '../../hooks/useRickAndMortyApi';

jest.mock('../../hooks/useRickAndMortyApi'); // Mock the custom hook

describe('Episodes component', () => {
  test('renders Episodes component correctly', () => {
    // Mock data for the API response
    const mockApiResponse = {
      info: {
        air_date: '2022-01-01',
        name: 'Test Episode',
        episode: 'S01E01',
      },
      charactersData: [
        { id: 1, name: 'Character 1', status: 'Alive' },
        { id: 2, name: 'Character 2', status: 'Dead' },
      ],
    };

    // Mock the custom hook implementation
    useRickAndMortyApi.mockReturnValue(mockApiResponse);

    // Render the Episodes component
    render(<Episodes />);

    // Check if episode information is rendered
    expect(screen.getByText(/Episode Name/)).toBeInTheDocument();
    expect(screen.getByText(/Aired on -/)).toBeInTheDocument();

    // Check if the Search component is present with the correct test ID
    expect(screen.getByTestId('search-component')).toBeInTheDocument();

    // Check if the filter dropdown is present with the correct test ID
    expect(screen.getByTestId('filter-dropdown')).toBeInTheDocument();

    // Check if character cards are rendered
    expect(screen.getAllByTestId('card-component')).toBeTruthy();

    // Additional assertions as needed
  });

  test('handles dropdown change', () => {
    // Mock the custom hook implementation
    useRickAndMortyApi.mockReturnValue({ info: {}, charactersData: [] });

    // Render the Episodes component
    render(<Episodes />);

    // Simulate a change in the dropdown value
    fireEvent.change(screen.getByTestId('filter-dropdown'), {
      target: { value: 2 },
    });

    // Assert that the episode ID is updated
    expect(screen.getByTestId('filter-dropdown')).toHaveValue('2');
  });
});
