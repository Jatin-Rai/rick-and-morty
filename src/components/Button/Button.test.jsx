import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this for additional matchers
import Button from './Button';

describe('Button component', () => {
  test('renders with the correct placeholder text', () => {
    const placeholderText = 'Click me';
    render(<Button placeholder={placeholderText} />);

    // Use screen.getByText to find the rendered text
    const buttonElement = screen.getByText(placeholderText);

    // Assert that the button is in the document
    expect(buttonElement).toBeInTheDocument();

    // To check if the button has the correct class
    expect(buttonElement).toHaveClass('btn');
  });
});
