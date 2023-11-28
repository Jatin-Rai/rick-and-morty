import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
  test('renders search input', () => {
    // Arrange
    const setSearchMock = jest.fn();
    const setPageNumberMock = jest.fn();

    // Act
    render(<Search setSearch={setSearchMock} setPageNumber={setPageNumberMock} />);

    // Assert
    const searchInput = screen.getByPlaceholderText('Search for characters');
    expect(searchInput).toBeInTheDocument();
  });

  test('calls setSearch and setPageNumber on input change', () => {
    // Arrange
    const setSearchMock = jest.fn();
    const setPageNumberMock = jest.fn();
    render(<Search setSearch={setSearchMock} setPageNumber={setPageNumberMock} />);

    // Act
    const searchInput = screen.getByPlaceholderText('Search for characters');
    fireEvent.change(searchInput, { target: { value: 'Rick' } });

    // Assert
    expect(setSearchMock).toHaveBeenCalledWith('Rick');
    expect(setPageNumberMock).toHaveBeenCalledWith(1);
  });
});
