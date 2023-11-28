import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

// Import your components
import { CharacterProvider, useCharacterContext } from './CharacterContext';

// Mock the axios library
jest.mock('axios');

// Mock the child component that uses the context
const TestComponent = () => {
  const { info, results } = useCharacterContext();

  return (
    <div>
      <div data-testid="info">{JSON.stringify(info)}</div>
      <div data-testid="results">{JSON.stringify(results)}</div>
    </div>
  );
};

describe('CharacterProvider and useCharacterContext', () => {
  it('renders children with context values', async () => {
    // Mock the API response
    const mockData = {
      info: { pages: 1 },
      results: [{ id: 1, name: 'Character 1' }],
    };

    // Use axios.mockResolvedValueOnce instead of jest.spyOn
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Render the component tree with the provider
    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );

    // Wait for the asynchronous data fetching
    await waitFor(() => screen.findByTestId('results'));

    // Verify that the context values are provided to the children
    expect(screen.getByTestId('info')).toHaveTextContent(JSON.stringify(mockData.info));
    expect(screen.getByTestId('results')).toHaveTextContent(JSON.stringify(mockData.results));
  });

});
