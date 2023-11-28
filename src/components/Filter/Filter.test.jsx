import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  it('calls onChange when an option is selected', () => {
    // Mock data for testing
    const testData = ['Option 1', 'Option 2', 'Option 3'];

    // Mock the onChange callback
    const mockOnChange = jest.fn();

    // Render the Filter component
    render(
      <Filter
        value=""
        onChange={mockOnChange}
        data={testData}
        placeholder="Select an option"
        testid="filter-select"
      />
    );

    // Trigger a change event by selecting an option
    fireEvent.change(screen.getByTestId('filter-select'), { target: { value: 'Option 2' } });

    expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
  });
});
