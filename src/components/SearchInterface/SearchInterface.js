import React, { Component } from 'react';

import ListItem   from '../ListItem/ListItem';
import { search } from '../../api/omdb';


import './SearchInterface.css';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      items          : [],
      page           : 1,
      searchVal      : '',
      isLoadMoreItems: false,
      isLoadingItems : false,
      isScrollBottom : false,
      isSearchFulfill: false
    };
  }

  onListScroll = event => {
    const element        = event.target;
    const isScrollBottom = element.scrollTop + element.clientHeight === element.scrollHeight;

    this.setState({
      isScrollBottom : isScrollBottom,
      isLoadMoreItems: isScrollBottom
    });
  };

  getListContentEl = element => {
    this.listContentEl = element;
  };

  getListEl = element => {
    this.listEl = element;

    element.addEventListener('scroll', this.onListScroll);
  };

  componentWillUnmount() {
    this.listEl.removeEventListener('scroll', this.onListScroll);
  }

  loadMoreItems = ({ searchVal, page, items }) => {
    this.setState({ isLoadingItems: true });

    search(searchVal, page).then(result => {
      if (result.length) {
        this.setState({
          items         : items.concat(result),
          page          : page,
          isLoadingItems: false,
        });
      } else {
        this.setState({
          isLoadMoreItems: false,
          isLoadingItems : false,
          isSearchFulfill: true
        });
      }
    });
  };

  onInputChange = event => {
    this.setState({
      searchVal: event.target.value,
      page     : 1
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { items } = this.state;

    return nextState.items.length !== items;
  }

  componentDidUpdate() {
    let {
          isLoadMoreItems,
          isLoadingItems,
          page,
          searchVal,
          items,
          isSearchFulfill,
          isScrollBottom
        } = this.state;

    if (isLoadMoreItems && !isSearchFulfill) {
      if ((this.listContentEl.clientHeight < this.listEl.clientHeight || isScrollBottom) && !isLoadingItems) {
        this.loadMoreItems({ searchVal, page: ++page, items });
      } else {
        this.setState({ isLoadMoreItems: false });
      }
    }
  }

  onSearch = event => {
    event.preventDefault();

    const { searchVal } = this.state;

    if (!searchVal) {
      this.setState({ items: [] });

      return;
    }

    search(searchVal, 1).then(result => {
      this.setState({
        items          : result,
        page           : 1,
        isLoadMoreItems: !!result.length,
        isSearchFulfill: false
      });
    });
  };

  render() {
    const { items, isLoadingItems, searchVal } = this.state;

    return (
      <div>
        <form className="search-form"
              onSubmit={this.onSearch}>
          <input className="search-form__input"
                 type="text"
                 value={searchVal}
                 onChange={this.onInputChange}
                 placeholder="Search..."
                 name="search"/>
          <button className="search-form__btn"
                  type="submit">Search
          </button>
        </form>
        <div className="list"
             ref={this.getListEl}>
          <div className="list__content"
               ref={this.getListContentEl}>
            {items.map(file =>
              <ListItem
                item={file}
                key={file.imdbID}/>
            )}
          </div>
        </div>
        {isLoadingItems ? <span>Loading...</span> : ''}
      </div>
    );
  }
};
