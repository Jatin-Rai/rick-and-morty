import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders Button component with provided placeholder', () => {
  render(<Button placeholder="Click me" />);

  // Check if the button with the specified text content is rendered
  const buttonElement = screen.getByText('Click me');
  expect(buttonElement).toBeInTheDocument();

});
