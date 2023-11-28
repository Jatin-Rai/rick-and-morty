import React from 'react';
import style from './Pagination.module.css';

import { useCharacterContext } from '../../context/CharacterContext';

/**
 * Pagination component for navigating through pages.
 * @returns {JSX.Element} Pagination element with Previous and Next buttons.
 */
const Pagination = () => {
    // Accessing data from the character context
    const { info, pageNumber, setPageNumber } = useCharacterContext();

    /**
     * Handles page change based on the button clicked.
     * @param {number} newPage - The new page number.
     */
    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
    };

    return (
        <div className={style.container} data-testid="pagination-component">
            {/* Button to navigate to the previous page */}
            <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
                Previous
            </button>

            {/* Display current page and total pages */}
            <span>{`${pageNumber} of ${info ? info.pages : 1}`}</span>

            {/* Button to navigate to the next page */}
            <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === (info ? info.pages : 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
