import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('renders navigation links', () => {
    // Arrange
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Act
    const homeLink = screen.getByRole('link', { name: /home/i });
    const charactersLink = screen.getByRole('link', { name: /characters/i });
    const episodesLink = screen.getByRole('link', { name: /episodes/i });
    const locationsLink = screen.getByRole('link', { name: /locations/i });

    // Assert
      // Check if the navigation links are rendered
    expect(homeLink).toBeInTheDocument();
    expect(charactersLink).toBeInTheDocument();
    expect(episodesLink).toBeInTheDocument();
    expect(locationsLink).toBeInTheDocument();
  });
});
