import React from 'react';

/**
 * A filter component with a dropdown menu.
 * @param {Object} props - Component properties.
 * @param {string} props.value - The selected value of the filter.
 * @param {Function} props.onChange - Callback function to handle filter value changes.
 * @param {Array} props.data - The array of data options for the filter.
 * @param {string} props.placeholder - The placeholder text for the default option.
 * @returns {JSX.Element} Filter element with a dropdown menu.
 */
const Filter = ({ value, onChange, data, placeholder, testid }) => {
    return (
        <select name={value} id={value} onChange={onChange} value={value} data-testid={testid || "filter-select"}>
            <option value="">{placeholder}</option>
            {data.map((menu, index) => (
                <option key={index + 1} value={menu}>
                    {menu}
                </option>
            ))}
        </select>
    );
}

export default Filter;
