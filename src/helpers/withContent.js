import React, { Component } from 'react';

const BREAKPOINT_WIDTH = 768;


export default WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      const pageWidth = props.pageWidth;

      this.state = {
        pageWidth,
        isContentShown: pageWidth >= BREAKPOINT_WIDTH
      };
    }

    componentWillReceiveProps({ pageWidth }) {
      if (pageWidth >= BREAKPOINT_WIDTH && this.state.pageWidth < BREAKPOINT_WIDTH) {
        this.showContent();
      }

      if (pageWidth < 768 && this.state.pageWidth >= 768) {
        this.hideContent();
      }

      this.setState({ pageWidth });
    }

    showContent = () => this.setState({ isContentShown: true });

    hideContent = () => this.setState({ isContentShown: false });

    render() {
      const props = {
        ...this.props,
        isContentShown: this.state.isContentShown,
        showContent   : this.showContent,
        hideContent   : this.hideContent
      };

      return <WrappedComponent {...props}/>;
    }
  }
};
