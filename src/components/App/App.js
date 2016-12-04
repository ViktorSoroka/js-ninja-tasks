import React, { Component } from 'react';

import Layout      from '../Layout/Layout';
import ListItem    from '../ListItem/ListItem';
import SearchField from '../../components/SearchField/SearchField';
import FilmInfo    from '../FilmInfo/FilmInfo';

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
    if (!value) {
      return this.setState({
        items : [],
        itemId: null
      });
    }

    search(value).then(result => this.setState({ items: result }));
  };

  render() {
    const { items, itemId } = this.state;

    const sidebar = <div>
        <SearchField onSearch={this.onSearch}/>
        <div className="movie-list">
          {items.map(file =>
            <ListItem
              item={file}
              onGetDetailsPressed={this.onGetDetailsPressed}
              key={file.imdbID}/>
          )}
        </div>
    </div>;

    return (
      <Layout sidebar={sidebar}>
        <FilmInfo itemId={itemId}/>
      </Layout>
    );
  }
}
