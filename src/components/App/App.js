import React, { Component } from 'react';

import ListItem    from '../ListItem/ListItem';
import SearchField from '../../components/SearchField/SearchField';
import FilmInfo    from '../FilmInfo/FilmInfo';
import Burger      from '../Burger/Burger'

import {
  getById,
  search
} from '../../api/omdb';

import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showBurgerContent: false,
      items            : []
    };
  }

  componentDidMount() {
    getById('tt2407380').then((result) => {
      this.setState({ item: result });
    });
  }

  onGetDetailsPressed = itemId => this.setState({
    itemId
  });

  onSearch = (value) => {
    search(value).then(result => this.setState({
      items: result
    }));
  };

  render() {
    const { items, itemId } = this.state;

    return (
      <div className="app">
        <div className="app-header">
          <h2>Infinity scroll</h2>
        </div>
        <Burger>
          <SearchField onSearch={this.onSearch}/>

          {items.map(file =>
            <ListItem
              item={file}
              onGetDetailsPressed={this.onGetDetailsPressed}
              key={file.imdbID}/>
          )}

          <FilmInfo itemId={itemId}/>
        </Burger>
      </div>
    );
  }
}
