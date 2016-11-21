import React, { Component } from 'react';

import './Burger.css';


export default class Burger extends Component {
  constructor() {
    super();

    this.state = {
      showContent: false
    };
  }

  toggleContentVisibility = event => {
    const { showContent } = this.state;

    this.setState({
      showContent: !showContent
    });
  };

  render() {
    return (
      <div className="burger">
        {this.state.showContent ?
          <div>
            { this.props.children }
          </div> :
          <div>
            <button onClick={this.toggleContentVisibility}>...</button>
            <div>Select something on the left tab!</div>
          </div>}
      </div>
    );
  }
}
