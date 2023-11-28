// Locations.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Locations from './Locations';
import useRickAndMortyApi from '../../hooks/useRickAndMortyApi';

jest.mock('../../hooks/useRickAndMortyApi'); // Mock the custom hook

describe('Locations component', () => {
  test('renders Locations component correctly', () => {
    // Mock data for the API response
    const mockApiResponse = {
      info: {
        dimension: 'Test Dimension',
        name: 'Test Location',
        type: 'Test Type',
      },
      charactersData: [
        { id: 1, name: 'Character 1', status: 'Alive' },
        { id: 2, name: 'Character 2', status: 'Dead' },
      ],
    };

    // Mock the custom hook implementation
    useRickAndMortyApi.mockReturnValue(mockApiResponse);

    // Render the Locations component
    render(<Locations />);

    // Check if location information is rendered with correct data-testid attributes
    expect(screen.getByTestId('locations-component')).toBeInTheDocument();
    expect(screen.getByTestId('location-name')).toHaveTextContent('Test Location');
    expect(screen.getByTestId('location-dimension')).toHaveTextContent('Test Dimension');
    expect(screen.getByTestId('location-type')).toHaveTextContent('Test Type');

    // Check if the Search component is present with the correct data-testid attribute
    expect(screen.getByTestId('search-component')).toBeInTheDocument();

    // Check if the filter dropdown is present with the correct data-testid attribute
    expect(screen.getByTestId('location-id-select')).toBeInTheDocument();

    // Check if character cards are rendered with correct data-testid attribute
    expect(screen.getByTestId('characters-card-layout')).toBeInTheDocument();
    expect(screen.getAllByTestId('characters-card')).toBeTruthy();

  });

  test('handles dropdown change', () => {
    // Mock the custom hook implementation
    useRickAndMortyApi.mockReturnValue({ info: {}, charactersData: [] });

    // Render the Locations component
    render(<Locations />);

    // Simulate a change in the dropdown value
    fireEvent.change(screen.getByTestId('location-id-select'), {
      target: { value: 2 },
    });

    // Assert that the location ID is updated
    expect(screen.getByTestId('location-id-select')).toHaveValue('2');
  });
});
