import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home component', () => {
  render(<Home />);

  // Check if the header element is rendered (using data-testid attribute)
  const headerElement = screen.getByTestId('home-header');
  expect(headerElement).toBeInTheDocument();

  // Check if the image container element is rendered (using data-testid attribute)
  const imageContainerElement = screen.getByTestId('home-image-container');
  expect(imageContainerElement).toBeInTheDocument();

  // You can add more specific checks as needed
  // For example, check if specific text or the image itself is present
  const welcomeText = screen.getByText('Welcome');
  expect(welcomeText).toBeInTheDocument();

  // Similarly, check for other elements or text content
  // For example, check for the presence of "Nerds" or other text
  const nerdsText = screen.getByText('Nerds');
  expect(nerdsText).toBeInTheDocument();
});
