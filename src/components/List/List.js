import React, { Component } from 'react';

import ListItem   from '../ListItem/ListItem';

import './List.css';

export default class List extends Component {
  getListEl = el => {
    this.listEl = el;
  };

  getListContentEl = el => {
    this.listContentEl = el;
  };

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  componentDidUpdate() {
    if (this.listEl.clientHeight < this.listContentEl.clientHeight) {
      this.props.loadMoreItems();
    }
  }

  render() {
    const { items } = this.props;

    return (
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
    )
  };
}
