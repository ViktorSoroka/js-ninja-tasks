import React, { Component, PropTypes } from 'react';

import './SearchField.css'


export default  class Search extends Component {
  constructor() {
    super();

    this.state = { value: '' };
  }

  onInputChange = event => {
    this.setState({ value: event.target.value });
  };

  onSearch = event => {
    event.preventDefault();

    this.props.onSearch(this.state.value);
  };

  render() {
    const { value } = this.state;

    return (
      <form className="search-form"
            onSubmit={this.onSearch}>
        <input className="search-form__input"
               type="text"
               value={value}
               onChange={this.onInputChange}
               placeholder="Search..."
               name="search"/>
        <button className="search-form__btn"
                type="submit">Search
        </button>
      </form>
    );
  }

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };
}
