import React from 'react';
import { render, screen } from '@testing-library/react';
import Locations from './Locations';

// Mock the custom hook
jest.mock('../../hooks/useRickAndMortyApi', () => ({
  __esModule: true,
  default: () => ({
    info: { dimension: 'Test Dimension', name: 'Test Name', type: 'Test Type' },
    charactersData: [
      { id: 1, name: 'Character 1' },
      { id: 2, name: 'Character 2' },
    ],
  }),
}));

test('renders Locations component', () => {
  render(<Locations />);

  // Check if the main container is rendered (using data-testid attribute)
  const locationsComponent = screen.getByTestId('locations-component');
  expect(locationsComponent).toBeInTheDocument();

  // Check if the location name is rendered (using data-testid attribute)
  const locationName = screen.getByTestId('location-name');
  expect(locationName).toBeInTheDocument();

  // Check if the location dimension is rendered (using data-testid attribute)
  const locationDimension = screen.getByTestId('location-dimension');
  expect(locationDimension).toBeInTheDocument();

  // Check if the location type is rendered (using data-testid attribute)
  const locationType = screen.getByTestId('location-type');
  expect(locationType).toBeInTheDocument();

  // Check if the search component is rendered (using data-testid attribute)
  const searchComponent = screen.getByTestId('search-component');
  expect(searchComponent).toBeInTheDocument();

  // Check if the location ID select is rendered (using data-testid attribute)
  const locationIdSelect = screen.getByTestId('location-id-select');
  expect(locationIdSelect).toBeInTheDocument();

  // Check if the characters card layout is rendered (using data-testid attribute)
  const charactersCardLayout = screen.getByTestId('characters-card-layout');
  expect(charactersCardLayout).toBeInTheDocument();

  // You can add more specific checks based on your component structure
  // For example, check if specific character cards are rendered
  expect(screen.getByText('Character 1')).toBeInTheDocument();
  expect(screen.getByText('Character 2')).toBeInTheDocument();
});
