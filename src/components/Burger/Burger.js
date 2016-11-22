/* global $ */
import React, { Component } from 'react';

import './Burger.css';


export default class Burger extends Component {
  constructor() {
    super();

    this.state = { showContent: false };
  }

  closeBurgerHandler = event => {
    const eventTarget         = event.target;

    // handle magnific popup
    if ($(eventTarget).closest('.mfp-wrap').length) return;

    const isClickInsideBurger = !!$(eventTarget).closest('.burger').length;

    if (!isClickInsideBurger && eventTarget !== this.btnToggler || eventTarget.classList.contains('list-item__btn')) {
      return this.setState({ showContent: false });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.closeBurgerHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeBurgerHandler);
  }

  getBurgerToggler = event => {
    this.btnToggler = event;
  };

  onBurgerTogglerClick = event => {
    event.nativeEvent.stopImmediatePropagation();

    this.setState({ showContent: true });
  };

  render() {
    return (
      <div className="burger">
        {this.state.showContent ?
          <div className="burger__content">{this.props.children}</div> :
          <button className="burger__btn-toggler"
                  type="button"
                  ref={this.getBurgerToggler}
                  onClick={this.onBurgerTogglerClick}>...
          </button>}
      </div>
    );
  }
}
