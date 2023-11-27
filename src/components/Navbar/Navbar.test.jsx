import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('renders navigation links with correct text content', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if navigation links are rendered
    const homeLink = screen.getByText('Home');
    const charactersLink = screen.getByText('Characters');
    const episodesLink = screen.getByText('Episodes');
    const locationsLink = screen.getByText('Locations');

    expect(homeLink).toBeInTheDocument();
    expect(charactersLink).toBeInTheDocument();
    expect(episodesLink).toBeInTheDocument();
    expect(locationsLink).toBeInTheDocument();
  });

  test('links navigate to the correct routes', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if navigation links have the correct route href
    const homeLink = screen.getByText('Home');
    const charactersLink = screen.getByText('Characters');
    const episodesLink = screen.getByText('Episodes');
    const locationsLink = screen.getByText('Locations');

    expect(homeLink).toHaveAttribute('to', '/');
    expect(charactersLink).toHaveAttribute('to', '/characters');
    expect(episodesLink).toHaveAttribute('to', '/episodes');
    expect(locationsLink).toHaveAttribute('to', '/locations');
  });

  test('renders navigation links using Link component', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check if navigation links are rendered using the Link component
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const charactersLink = screen.getByRole('link', { name: 'Characters' });
    const episodesLink = screen.getByRole('link', { name: 'Episodes' });
    const locationsLink = screen.getByRole('link', { name: 'Locations' });

    expect(homeLink.tagName).toBe('A');
    expect(charactersLink.tagName).toBe('A');
    expect(episodesLink.tagName).toBe('A');
    expect(locationsLink.tagName).toBe('A');
  });
});
