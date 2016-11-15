import React from 'react';

import './SearchField.css';

const Search = ({ searchVal, onInputChange, onSearch }) => {
  return (
    <form className="search-form"
          onSubmit={onSearch}>
      <input className="search-form__input"
             type="text"
             value={searchVal}
             onChange={onInputChange}
             placeholder="Search..."
             name="search"/>
      <button className="search-form__btn"
              type="submit">Search
      </button>
    </form>
  );
};

export default Search;
