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
        <header className="mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600" >
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">
              Nerdekos
            </span>
            <div className="mdl-layout-spacer"></div>
            {/* this.getCode()*/}
          </div>
        </header>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid content">{this.props.content}</div>
        </main>
      </div>
    );
  }
}

HomeLayout.propTypes = {
  content: React.PropTypes.object,

};
