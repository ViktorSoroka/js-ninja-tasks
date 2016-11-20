/* global $ */
import React from 'react';

import './ListItem.css';


const ListItem = ({ item }) => {
  const createPosterLightBox = element => {
    $(element).magnificPopup({
      type : 'image',
      items: {
        src: item.Poster,
      },
    });
  };

  return (
    <div className="list-item">
      <div className="poster">
        { item.Poster ?
          <img ref={createPosterLightBox}
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
};

export default ListItem;
