import React, { PropTypes } from 'react';

import Burger        from '../Burger/Burger';

import withContent   from '../../helpers/withContent';
import withPageWidth from '../../helpers/withPageWidth';

import './Layout.css';


const Layout = ({ isContentShown, showContent, hideContent, sidebar, children }) =>
  <div className="app">
    <aside className="app__sidebar">
      <Burger {...{ isContentShown, showContent, hideContent }}>{sidebar}</Burger>
    </aside>
    <main className="app__main">{children}</main>
  </div>;

Layout.propTypes = {
  sidebar       : PropTypes.node,
  children      : PropTypes.node,
  isContentShown: PropTypes.bool,
  showContent   : PropTypes.func,
  hideContent   : PropTypes.func,
};

export default withPageWidth(withContent(Layout));
