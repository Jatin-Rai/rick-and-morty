import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCharacterContext } from '../../context/CharacterContext';
import Pagination from './Pagination';

// Mocking the useCharacterContext hook
jest.mock('../../context/CharacterContext', () => ({
  ...jest.requireActual('../../context/CharacterContext'),
  useCharacterContext: jest.fn(),
}));

describe('Pagination component', () => {
  test('renders pagination buttons', () => {
    // Arrange
    useCharacterContext.mockReturnValue({
      info: { pages: 5 },
      pageNumber: 3,
      setPageNumber: jest.fn(),
    });

    // Act
    render(<Pagination />);

    // Assert
    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('calls setPageNumber on button click', () => {
    // Arrange
    const setPageNumberMock = jest.fn();
    useCharacterContext.mockReturnValue({
      info: { pages: 5 },
      pageNumber: 3,
      setPageNumber: setPageNumberMock,
    });

    // Act
    render(<Pagination />);
    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    fireEvent.click(previousButton);

    // Assert
    expect(setPageNumberMock).toHaveBeenCalledWith(2);
    
    // Reset mock function
    setPageNumberMock.mockReset();

    // Act
    fireEvent.click(nextButton);

    // Assert
    expect(setPageNumberMock).toHaveBeenCalledWith(4);
  });
});
