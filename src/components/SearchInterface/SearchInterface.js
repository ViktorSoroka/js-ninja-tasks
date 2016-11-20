import React, { Component } from 'react';

import SearchForm from '../SearchForm/SearchForm';
import List       from '../List/List';
import { search } from '../../api/omdb';


export default class Search extends Component {
  constructor() {
    super();

    this.searchVal = '';
    this.state     = {
      items          : [],
      page           : 1,
      isSearchFulfill: false
    };
  }

  loadMoreItems = () => {
    const { page, items, isSearchFulfill } = this.state;

    if (isSearchFulfill) return;

    const nextPage = page + 1;

    return search(this.searchVal, nextPage).then(newItems => {
      // stop search if new data is not supplied from server (empty array)
      if (!newItems.length) {
        return this.setState({ isSearchFulfill: true });
      }

      this.setState({
        items: items.concat(newItems),
        page : nextPage,
      });
    });
  };

  onSearch = searchVal => {
    this.searchVal = searchVal;

    // prevent search if search string is empty and reset params
    if (!searchVal) {
      return this.setState({
        items          : [],
        page           : 1,
        isSearchFulfill: true,
      });
    }

    search(searchVal, 1).then(result => {
      this.setState({
        items          : result,
        page           : 1,
        isSearchFulfill: false,
      });
    });
  };

  render() {
    const { items, isSearchFulfill } = this.state;

    return (
      <div>
        <SearchForm onSearch={this.onSearch}/>
        <List className={this.props.className}
              items={items}
              loadMoreItems={this.loadMoreItems}
              isSearchFulfill={isSearchFulfill}/>
      </div>
    );
  }
};
