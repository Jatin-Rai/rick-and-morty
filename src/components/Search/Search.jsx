import React from 'react';
import style from './Search.module.css';

/**
 * A search input component for filtering characters.
 * @param {Function} setSearch - A function to set the search query state.
 * @param {Function} setPageNumber - A function to set the page number state.
 * @returns {JSX.Element} Search input form.
 */
const Search = ({ setSearch, setPageNumber }) => {
  return (
    <form className={style.container} data-testid="search-component">
      <input
        type="text"
        placeholder="Search for characters"
        onChange={(e) => {
          // Set page number to 1 if setPageNumber is provided
          setPageNumber && setPageNumber(1);

          // Set search query using setSearch if provided
          setSearch && setSearch(e.target.value);
        }}
      />
    </form>
  );
};

export default Search;
