/* global $ */
import React, { Component } from 'react';

import './ListItem.css';

export default class ListItem extends Component {
  createPosterLightBox = element => {
    $(element).magnificPopup({
      type : 'image',
      items: {
        src: this.props.item.Poster,
      },
    });
  };

  render() {
    const { item } = this.props;

    return (
      <div className="list-item">
        <div className="poster">
          { item.Poster ?
            <img ref={this.createPosterLightBox}
                 className="poster__img"
                 role="presentation"
                 src={item.Poster}/> : null}
        </div>
        <div className="list-item__content">
          <h2 className="list-item__title">{item.Title}</h2>
          <span className="list-item__info">{item.Year}</span>
        </div>
      </div>
    );
  }
}
