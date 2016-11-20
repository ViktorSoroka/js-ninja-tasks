/* global $ */
import React, { Component } from 'react';

import ListItem   from '../ListItem/ListItem';

import './List.css';

export default class List extends Component {
  constructor() {
    super();

    this.state = { isLoadingMoreItems: false };
  }

  getListContentEl = element => {
    this.listContentEl = element;
  };

  getListEl = element => {
    this.listEl = element;

    element.addEventListener('scroll', this.onListScroll);
  };

  onListScroll = event => {
    const element        = event.target;
    const isScrollBottom = element.scrollTop + element.clientHeight === element.scrollHeight;

    if (isScrollBottom) {
      this.loadMoreItems(() => isScrollBottom);
    }
  };

  resetLoadingItems() {
    this.setState({ isLoadingMoreItems: false });
  };

  checkListContentItemsNeed() {
    return this.listContentEl.clientHeight < this.listEl.clientHeight;
  }

  componentDidUpdate() {
    const isMoreItemsNeeded = this.checkListContentItemsNeed();

    this.loadMoreItems(() => isMoreItemsNeeded);
  }

  loadMoreItems(predicate) {
    const { isLoadingMoreItems }             = this.state;
    const { loadMoreItems, isSearchFulfill } = this.props;

    if (isSearchFulfill) {
      if (isLoadingMoreItems) {
        this.resetLoadingItems();
      }

      return;
    }

    if (!isLoadingMoreItems && predicate()) {
      this.setState({ isLoadingMoreItems: true });

      const result = loadMoreItems();

      if (!result) {
        return this.resetLoadingItems();
      }

      result.then(() => this.resetLoadingItems());
    }
  };

  componentWillUnmount() {
    this.listEl.removeEventListener('scroll', this.onListScroll);
  }

  render() {
    const { items, className }   = this.props;
    const { isLoadingMoreItems } = this.state;

    return (
      <div>
        <div className={className}
             ref={this.getListEl}>
          <div className="list__content"
               ref={this.getListContentEl}>
            {items.map(file =>
              <ListItem
                item={file}
                key={file.imdbID}/>
            )}
          </div>
          {isLoadingMoreItems ? <span>Loading...</span> : ''}
        </div>
      </div>
    );
  }
}
