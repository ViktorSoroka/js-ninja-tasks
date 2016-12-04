import React, { Component, PropTypes } from 'react';

import { getById } from '../../api/omdb';

import logo from '../../logo.svg';
import './FilmInfo.css';


export default class FilmInfo extends Component {
  constructor() {
    super();

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      item   : null,
      loading: false
    };
  }

  componentWillReceiveProps({ itemId }) {
    this.setState({ loading: true });

    if (itemId === null) {
      return this.setState(this.getDefaultState());
    }

    getById(itemId).then(result => this.setState({
      item   : result,
      loading: false
    }));
  }

  render() {
    const { item, loading } = this.state;

    return (
      <div className="film-info">
        {loading ?
          <div className="film-info__spinner">
            <img src={logo} className="app-logo" alt="logo"/>
          </div> : !item ? <div>Please select any film</div> :
          <div>
            <img src={item.Poster} alt={item.Title}/>
            <div>
              <h1 className="film-info__title">{item.Title}</h1>
              <span className="film-info__details">{item.Actors}</span>
              <span className="film-info__details">{item.Genre}</span>
            </div>
          </div>
        }
      </div>
    );
  }

  static propTypes = {
    itemId: PropTypes.string
  };
}
