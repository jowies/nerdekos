import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { getUsername } from '../../api/admins/methods.js';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Admin',
      loading: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    getUsername.call({}, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          username: res,
          loading: false,
        });
        upgrade(this.refs.button);
      }
    });
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    downgrade(this.refs.button);
  }

  loading() {
    return <div></div>;
  }

  handleClick() {
    FlowRouter.go('/admin/suggestions');
  }

  renderPage() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--2-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
        <div
          className="admin-content
            mdl-color--grey-900
            mdl-shadow--4dp mdl
            mdl-cell
            mdl-cell--8-col
            mdl-color-text--grey-100"
        >
          <h3 style={{ textAlign: 'center' }}>Velkommen, {this.state.username}!</h3>
          <p style={{ fontSize: 16 }}>
            Jeg vil først takke deg
            for at du ønsker å bidra til Nerdekos.
            Som administrator har du et ansvar
            for at kartet på Nerdekos er så oppdatert og
            tro mot virkeligheten som mulig.
          </p>
          <p style={{ fontSize: 16 }}>
            Siden Nerdekos inneholder sensitiv
            persondata( Jeg mener vi har tross alt et kart
            over hvem folk har ligget med).
            ber jeg dere om å holde adminbrukeren privat
            og at dere IKKE deler den med andre. Misbrukes
            makten vil adminbrukeren din bli
            slettet og det vil vi jo ikke.
          </p>
          <p style={{ fontSize: 16 }}>
            Ellers er det ikke så mye å si,
            legg til folk, godkjenn forslag,
            eller nyt kartet.
          </p>
          <button
            ref="button"
            onClick={this.handleClick}
            style={{ fontSize: 18, margin: '0 auto', display: 'block' }}
            className="mdl-button
              mdl-js-button
              mdl-js-ripple-effect
              admin-welcome
              mdl-shadow--4dp
              "
          >
            Administrer!
          </button>
        </div>
      </div>
    );
  }

  render() {
    return this.state.loading ? this.loading() : this.renderPage();
  }
}

