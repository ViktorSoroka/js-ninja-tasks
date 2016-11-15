import React, { Component } from 'react';

import SearchInterface from '../SearchInterface/SearchInterface';

import './App.css';


export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Infinity scroll</h2>
        </div>
        <SearchInterface/>
      </div>
    );
  }
}
