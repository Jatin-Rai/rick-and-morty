import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filter from './Filter';

describe('Filter component', () => {
  const data = ['Option1', 'Option2', 'Option3'];
  const placeholder = 'Select an option';
  let selectedValue = '';

  const handleChange = (event) => {
    selectedValue = event.target.value;
  };

  beforeEach(() => {
    // Reset selected value before each test
    selectedValue = '';
  });

  test('renders with placeholder and options', () => {
    render(<Filter value={selectedValue} onChange={handleChange} data={data} placeholder={placeholder} />);

    // Check if the default option with placeholder is rendered
    const defaultOption = screen.getByText(placeholder);
    expect(defaultOption).toBeInTheDocument();

    // Check if each data option is rendered
    data.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('calls onChange callback when an option is selected', () => {
    render(<Filter value={selectedValue} onChange={handleChange} data={data} placeholder={placeholder} />);

    // Select an option
    const selectedOption = 'Option2';
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: selectedOption } });

    // Check if onChange callback is called with the selected value
    expect(selectedValue).toBe(selectedOption);
  });

  test('renders with the selected value', () => {
    const initialValue = 'Option1';
    render(<Filter value={initialValue} onChange={handleChange} data={data} placeholder={placeholder} />);

    // Check if the select element has the correct initial value
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue(initialValue);
  });
});
