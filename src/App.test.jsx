import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const appElement = screen.getByTestId('app-component');
  expect(appElement).toBeInTheDocument();
});

test('renders Navbar component', () => {
  render(<App />);
  const navbarElement = screen.getByTestId('navbar-component');
  expect(navbarElement).toBeInTheDocument();
});

test('renders Home component for the "/" route', () => {
  render(<App />);
  const homeElement = screen.getByTestId('home-component');
  expect(homeElement).toBeInTheDocument();
});

test('renders Characters component for the "/characters" route', () => {
  render(<App />);
  const charactersElement = screen.getByTestId('characters-component');
  expect(charactersElement).toBeInTheDocument();
});

test('renders CharacterDetail component for the "/characters/:id" route', () => {
  render(<App />);
  const characterDetailElement = screen.getByTestId('character-detail-component');
  expect(characterDetailElement).toBeInTheDocument();
});

test('renders Episodes component for the "/episodes" route', () => {
  render(<App />);
  const episodesElement = screen.getByTestId('episodes-component');
  expect(episodesElement).toBeInTheDocument();
});

test('renders Locations component for the "/locations" route', () => {
  render(<App />);
  const locationsElement = screen.getByTestId('locations-component');
  expect(locationsElement).toBeInTheDocument();
});
