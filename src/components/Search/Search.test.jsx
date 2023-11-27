import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';

describe('Search component', () => {
  test('renders the search input', () => {
    render(<Search />);

    // Check if the search input is rendered
    const searchInput = screen.getByPlaceholderText('Search for characters');
    expect(searchInput).toBeInTheDocument();
  });

  test('calls setSearch function when input value changes', () => {
    const mockSetSearch = jest.fn();

    render(<Search setSearch={mockSetSearch} />);

    // Type 'Rick' in the search input
    const searchInput = screen.getByPlaceholderText('Search for characters');
    fireEvent.change(searchInput, { target: { value: 'Rick' } });

    // Check if setSearch function is called with the correct argument
    expect(mockSetSearch).toHaveBeenCalledWith('Rick');
  });

  test('calls setPageNumber function when input value changes and setPageNumber is provided', () => {
    const mockSetPageNumber = jest.fn();

    render(<Search setPageNumber={mockSetPageNumber} />);

    // Type 'Morty' in the search input
    const searchInput = screen.getByPlaceholderText('Search for characters');
    fireEvent.change(searchInput, { target: { value: 'Morty' } });

    // Check if setPageNumber function is called with the argument 1
    expect(mockSetPageNumber).toHaveBeenCalledWith(1);
  });

  test('does not call setPageNumber function when input value changes and setPageNumber is not provided', () => {
    const mockSetPageNumber = jest.fn();

    render(<Search />);

    // Type 'Summer' in the search input
    const searchInput = screen.getByPlaceholderText('Search for characters');
    fireEvent.change(searchInput, { target: { value: 'Summer' } });

    // Check if setPageNumber function is not called
    expect(mockSetPageNumber).not.toHaveBeenCalled();
  });
});
