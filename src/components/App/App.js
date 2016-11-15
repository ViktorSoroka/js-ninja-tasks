import React, { Component } from 'react';

import List        from '../List/List';
import SearchField from '../../components/SearchField/SearchField';
import { search }  from '../../api/omdb';

import './App.css';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      searchVal: '',
      page     : 1,
      items    : [],
    };
  }

  componentDidMount() {
  }

  onInputChange = event => {
    this.setState({
      searchVal: event.target.value,
    });
  };

  onSearch = event => {
    event.preventDefault();

    const { page, searchVal } = this.state;

    search(searchVal, page).then(result => this.setState({
      items: result,
      page : page + 1,
    }));
  };

  loadMoreItems = () => {
    const { page, items, searchVal } = this.state;

    search(searchVal, page).then(result => this.setState({
      items: items.concat(result),
      page : page + 1,
    }));
  };

  render() {
    const { items, searchVal } = this.state;

    return (
      <div className="app">
        <div className="app-header">
          <h2>Infinity scroll</h2>
        </div>
        <SearchField searchVal={searchVal}
                     onSearch={this.onSearch}
                     onInputChange={this.onInputChange}/>
        <List items={items}
              loadMoreItems={this.loadMoreItems}
        />
      </div>
    );
  }
}
