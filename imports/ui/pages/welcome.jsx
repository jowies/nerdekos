import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';

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
    console.log(e.target.value);
    if (options.indexOf(this.state.value) > -1) {
      FlowRouter.go('/kart');
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
            <div className="center-text center">
              <h1 className="mdl-color-text--grey-100">NERDEK<i style={{ fontSize: 48 }} className="material-icons mdl-color-text--red-A700">favorite</i>S</h1>
            </div>
          </div>
          <h3 className="center-text mdl-color-text--grey-100">HVA GJØR VI?</h3>
          <div className="center center-text" style={{ float: 'left', clear: 'left', width: '100%' }}>
            <form className="style-5" onSubmit={this.handleSubmit} >
              <input onChange={this.handleChange} value={this.state.value} type="text" />
              <button ref="button" onClick={this.handleSubmit} style={{ fontSize: 18 }} className="mdl-button mdl-js-button mdl-js-ripple-effect submit">!!!</button>
            </form>
          </div>
        </div>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

