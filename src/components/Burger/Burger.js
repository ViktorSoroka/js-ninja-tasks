/* global $ */
import React, { Component, PropTypes } from 'react';

import './Burger.css';


export default class Burger extends Component {
  closeBurgerHandler = ({ target }) => {
    // handle magnific popup
    if ($(target).closest('.mfp-wrap').length) return;

    const isClickInsideBurger = !!$(target).closest('.burger').length;

    if (!isClickInsideBurger && target !== this.btnToggler || target.classList.contains('list-item__btn')) { //eslint-disable-line no-mixed-operators
      return this.props.hideContent();
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

    this.props.showContent();
  };

  render() {
    const { isContentShown, children } = this.props;

    return (
      <div className="burger">
        {isContentShown ?
          <div className="burger__content">{children}</div> :
          <button className="burger__btn-toggler"
                  type="button"
                  ref={this.getBurgerToggler}
                  onClick={this.onBurgerTogglerClick}>...
          </button>}
      </div>
    );
  }

  static propTypes = {
    isContentShown: PropTypes.bool.isRequired,
    children      : PropTypes.node,
    hideContent   : PropTypes.func.isRequired,
    showContent   : PropTypes.func.isRequired,
  };
}
