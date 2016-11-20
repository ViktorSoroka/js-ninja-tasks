/* global $ */
import React, { Component } from 'react';

import './SearchForm.css';

export default class SearchForm extends Component {
  constructor() {
    super();

    this.state = { searchVal: '' };
  }

  onInputChange = event => {
    this.setState({ searchVal: event.target.value });
  };

  onSearch = event => {
    event.preventDefault();

    this.props.onSearch(this.state.searchVal);
  };

  render() {
    return (
      <form className="search-form"
            onSubmit={this.onSearch}>
        <input className="search-form__input"
               type="text"
               value={this.state.searchVal}
               onChange={this.onInputChange}
               placeholder="Search..."
               name="search"/>
        <button className="search-form__btn"
                type="submit">Search
        </button>
      </form>
    );
  }
}
