import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import { getUsernameByToken } from '../../api/admins/methods.js';

export default class SetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm: '',
      notEqual: false,
      error: false,
      name: 'Admin',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.button);
    console.log(this.props.token);
    getUsernameByToken.call({ token: this.props.token }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('change');
        this.setState({
          name: res,
        });
      }
    });
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    downgrade(this.refs.button);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('whatUp');
    if (this.state.password === this.state.confirm) {
      Accounts.resetPassword(this.props.token, this.state.password, (err) => {
        if (err) {
          this.setState({
            error: true,
          });
        } else {
          this.props.done();
          FlowRouter.go('/admin/welcome');
        }
      });
    }
  }

  handleChangePassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  handleChangeConfirm(e) {
    e.preventDefault();
    const state = {};
    state.confirm = e.target.value;
    if (this.state.password !== state.confirm) {
      state.notEqual = true;
    } else {
      state.notEqual = false;
    }
    this.setState(state);
  }

  render() {
    return (
      <div className="flexJustifyContentCenter flexDisplay" style={{ height: window.innerHeight }}>
        <div className="inner welcome-container">
          <div className="" style={{ float: 'left', width: '100%' }}>
            <div className="center center-text">
              <div style={{ display: 'inline-block' }}>
                <h3 className="center-text center mdl-color-text--grey-100" >Velg et passord, {this.state.name}!</h3>
              </div>
            </div>
          </div>
          <div className="center center-text" style={{ float: 'left', clear: 'left', width: '100%' }}>
            <form className="style-5" onSubmit={this.handleSubmit} >
              <input style={{ margin: '20px 0 20px 0' }} onChange={this.handleChangePassword} placeholder="Passord..." value={this.state.password} type="password" />
              <input style={{ margin: '20px 0 20px 0' }} onChange={this.handleChangeConfirm} placeholder="Gjenta passord..." value={this.state.confirm} type="password" />
              {this.state.notEqual ? <p className="mdl-color-text--red-300">Passordet er ikke likt</p> : ''}
              {this.state.error ? <p className="mdl-color-text--red-300">Feil ved setting av passord</p> : ''}
              <button ref="button" onClick={this.handleSubmit} style={{ fontSize: 18 }} className="mdl-button mdl-js-button mdl-js-ripple-effect submit">Velg</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SetPassword.propTypes = {
  done: React.PropTypes.func,
  token: React.PropTypes.string,
};
