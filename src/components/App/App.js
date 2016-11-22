import React, { Component } from 'react';

import ListItem    from '../ListItem/ListItem';
import SearchField from '../../components/SearchField/SearchField';
import FilmInfo    from '../FilmInfo/FilmInfo';
import Burger      from '../Burger/Burger'

import { search } from '../../api/omdb';

import './App.css';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      items : [],
      itemId: null
    };
  }

  onGetDetailsPressed = itemId => this.setState({ itemId });

  onSearch = value => {
    search(value).then(result => this.setState({ items: result }));
  };

  render() {
    const { items, itemId } = this.state;

    return (
      <div className="app">
        <Burger>
          <div>
            <SearchField onSearch={this.onSearch}/>

            <div className="movie-list">
              {items.map(file =>
                <ListItem
                  item={file}
                  onGetDetailsPressed={this.onGetDetailsPressed}
                  key={file.imdbID}/>
              )}
            </div>
          </div>
        </Burger>
        <FilmInfo itemId={itemId}/>
      </div>
    );
  }
}
