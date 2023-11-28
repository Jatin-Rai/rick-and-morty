// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home component', () => {
  render(<Home />);

  // Check if the header is present
  const headerElement = screen.getByTestId('home-header');
  expect(headerElement).toBeInTheDocument();

  // Check if the image container is present
  const imageContainerElement = screen.getByTestId('home-image-container');
  expect(imageContainerElement).toBeInTheDocument();

  // Check if the "Welcome" text is present
  const welcomeText = screen.getByText(/Welcome/i);
  expect(welcomeText).toBeInTheDocument();

  // Check if the "Nerds" text is present
  const nerdsText = screen.getByText(/Nerds/i);
  expect(nerdsText).toBeInTheDocument();

  // Check if the "Built with love by a Fan for the Fans" text is present
  const builtWithLoveText = screen.getByText(/Built with love by a Fan for the Fans/i);
  expect(builtWithLoveText).toBeInTheDocument();
});
