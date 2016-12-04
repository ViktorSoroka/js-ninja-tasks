import React, { Component } from 'react';


export default WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        pageWidth: window.innerWidth
      };
    }

    onResize = ({ target }) => {
      this.setState({ pageWidth: target.innerWidth });
    };

    componentDidMount() {
      window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }

    render() {
      const props = {
        ...this.props,
        pageWidth: this.state.pageWidth
      };

      return <WrappedComponent {...props} />;
    }
  }
}
