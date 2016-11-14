import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';

export default class AdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 20,
    };
    this.setWidth = this.setWidth.bind(this);
  }

  componentWillMount() {
    this.setWidth();
  }

  componentDidMount() {
    upgrade(this.refs.layout);
    this.setWidth();
    window.addEventListener('resize', this.setWidth);
  }

  componentWillUnmount() {
    downgrade(this.refs.layout);
    window.removeEventListener('resize', this.setWidth);
  }

  setWidth() {
    this.setState({
      width: this.getWidth(),
    });
  }

  getWidth() {
    if ((window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth) <= 1024) {
      return 56;
    }
    return 20;
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
          <div className="mdl-layout__header-row" style={{ paddingLeft: this.state.width }}>
            <i className="material-icons mdl-color-text--red-A700">favorite</i>
            <span className="mdl-layout-title mdl-color-text--grey-50"><a href="/">
              NERDEKOS<span style={{ fontSize: 12 }}>&nbsp; ADMINISTRATOR</span>
            </a></span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href="/admin/kart">Kosekartet</a>
              <a className="mdl-navigation__link" href="/admin/suggestions">Forslag</a>
              <a className="mdl-navigation__link" href="/admin/add">Legg til</a>
            </nav>
          </div>
        </header>
        <div
          className="mdl-layout__drawer
          mdl-layout--small-screen-only
          mdl-color--grey-900 drawer"
        >
          <nav className="mdl-navigation navigation">
            <a className="mdl-navigation__link" href="/kart">
              <i
                className="material-icons mdl-color-text--red-A700"
                role="presentation"
              >favorite</i>
              NERDEKOS
            </a>
            <a className="mdl-navigation__link" href="/admin/kart">
              <i className="material-icons" role="presentation">share</i>
              Kosekartet
            </a>
            <a className="mdl-navigation__link" href="/admin/suggestions">
              <i className="material-icons" role="presentation">mood</i>
              Forslag
            </a>
            <a className="mdl-navigation__link" href="/admin/add">
              <i className="material-icons" role="presentation">group_add</i>
              Legg til
            </a>
          </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-800">
          {this.props.content}
        </main>
      </div>
    );
  }
}

AdminLayout.propTypes = {
  content: React.PropTypes.object,
};
