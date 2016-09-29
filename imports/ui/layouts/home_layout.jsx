import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';

export default class HomeLayout extends React.Component {

  componentDidMount() {
    upgrade(this.refs.layout);
  }

  componentDidUpdate() {
    upgrade(this.refs.layout);
  }

  componentWillUnmount() {
    downgrade(this.refs.layout);
  }

  render() {
    return (
      <div
        className="mdl-layout mdl-js-layout
            mdl-layout--fixed-header layout"
        ref="layout"
      >
        <header
          id="header"
          className="mdl-layout__header mdl-color--grey-900 mdl-color-text--grey-600"
        >
          <div className="mdl-layout__header-row" style={{ paddingLeft: 16 }}>
            <i className="material-icons mdl-color-text--red-A700">favorite</i>
            <span className="mdl-layout-title mdl-color-text--grey-50">
              Nerdekos
            </span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
              <a className="mdl-navigation__link" href="">Link</a>
            </nav>
          </div>
        </header>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="">{this.props.content}</div>
        </main>
      </div>
    );
  }
}

HomeLayout.propTypes = {
  content: React.PropTypes.object,
};
