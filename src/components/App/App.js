import React from 'react';

import SearchInterface from '../SearchInterface/SearchInterface';

import './App.css';


const App = () => (
  <div className="app">
    <div className="app-header">
      <h2>Infinity scroll</h2>
    </div>
    <SearchInterface className="list"/>
  </div>
);

export default App;
