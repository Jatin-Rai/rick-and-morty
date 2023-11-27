import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CharacterProvider } from '../../context/CharacterContext';
import Pagination from './Pagination';

describe('Pagination component', () => {
  test('renders pagination buttons and page information', () => {
    const mockInfo = {
      pages: 5, // Total pages
    };

    render(
      <CharacterProvider value={{ info: mockInfo, pageNumber: 3, setPageNumber: jest.fn() }}>
        <Pagination />
      </CharacterProvider>
    );

    // Check if pagination buttons are rendered
    const previousButton = screen.getByRole('button', { name: 'Previous' });
    const nextButton = screen.getByRole('button', { name: 'Next' });

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // Check if page information is displayed
    const pageInfo = screen.getByText('3 of 5');
    expect(pageInfo).toBeInTheDocument();
  });

  test('handles page change when Next button is clicked', () => {
    const mockSetPageNumber = jest.fn();

    render(
      <CharacterProvider value={{ info: { pages: 5 }, pageNumber: 3, setPageNumber: mockSetPageNumber }}>
        <Pagination />
      </CharacterProvider>
    );

    // Click the Next button
    const nextButton = screen.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);

    // Check if the setPageNumber function is called with the correct argument
    expect(mockSetPageNumber).toHaveBeenCalledWith(4);
  });

  test('handles page change when Previous button is clicked', () => {
    const mockSetPageNumber = jest.fn();

    render(
      <CharacterProvider value={{ info: { pages: 5 }, pageNumber: 3, setPageNumber: mockSetPageNumber }}>
        <Pagination />
      </CharacterProvider>
    );

    // Click the Previous button
    const previousButton = screen.getByRole('button', { name: 'Previous' });
    fireEvent.click(previousButton);

    // Check if the setPageNumber function is called with the correct argument
    expect(mockSetPageNumber).toHaveBeenCalledWith(2);
  });

  test('disables Previous button on the first page', () => {
    render(
      <CharacterProvider value={{ info: { pages: 5 }, pageNumber: 1, setPageNumber: jest.fn() }}>
        <Pagination />
      </CharacterProvider>
    );

    // Check if the Previous button is disabled on the first page
    const previousButton = screen.getByRole('button', { name: 'Previous' });
    expect(previousButton).toBeDisabled();
  });

  test('disables Next button on the last page', () => {
    render(
      <CharacterProvider value={{ info: { pages: 5 }, pageNumber: 5, setPageNumber: jest.fn() }}>
        <Pagination />
      </CharacterProvider>
    );

    // Check if the Next button is disabled on the last page
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });
});
