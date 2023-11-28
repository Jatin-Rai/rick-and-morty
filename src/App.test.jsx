import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders App component with Navbar and Routes', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Check if Navbar is rendered
  const navbarElement = screen.getByTestId('navbar-component');
  expect(navbarElement).toBeInTheDocument();

  // Check if Routes and corresponding components are rendered
  const homeElement = screen.getByText(/home/i);
  expect(homeElement).toBeInTheDocument();

  const charactersElement = screen.getByText(/characters/i);
  expect(charactersElement).toBeInTheDocument();

  const episodesElement = screen.getByText(/episodes/i);
  expect(episodesElement).toBeInTheDocument();

  const locationsElement = screen.getByText(/locations/i);
  expect(locationsElement).toBeInTheDocument();
});
