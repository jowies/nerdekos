import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

const options = ['NU KØR VI', 'NÅ KØR VI', 'NU KÖR VI', 'NÅ KÖR VI', 'NKV'];
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.button);
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    downgrade(this.refs.button);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (options.indexOf(this.state.value) > -1) {
      Session.set('client', 'visitor');
      FlowRouter.go('/kart');
    } else if (this.state.value === 'ADMINISTRERER') {
      Session.set('client', 'admin');
      FlowRouter.go('/admin');
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value.toUpperCase() });
  }
  render() {
    return (
      <div className="flexJustifyContentCenter flexDisplay" style={{ height: window.innerHeight }}>
        <div className="inner welcome-container">
          <div className="" style={{ float: 'left', width: '100%' }}>
            <div className="center center-text">
              <div style={{ display: 'inline-block' }}>
                <h1 className="center-text center mdl-color-text--grey-100" style={{ marginBottom: 0, lineHeight: 0 }}>NERDEK<i style={{ fontSize: 48 }} className="material-icons mdl-color-text--red-A700">favorite</i>S</h1>
                <h6 className="mdl-color-text--grey-100" style={{ lineHeight: 2, marginTop: 0, textAlign: 'right', marginBottom: 40 }}>BY JOWIE</h6>
              </div>
            </div>
          </div>
          <h5 className="center-text mdl-color-text--grey-100">HVA GJØR VI?</h5>
          <div className="center center-text" style={{ float: 'left', clear: 'left', width: '100%' }}>
            <form className="style-5" onSubmit={this.handleSubmit} >
              <input onChange={this.handleChange} value={this.state.value} type="text" />
              <button ref="button" onClick={this.handleSubmit} style={{ fontSize: 18 }} className="mdl-button mdl-js-button mdl-js-ripple-effect submit">!!!</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

