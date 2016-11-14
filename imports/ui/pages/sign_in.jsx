import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

export default class SingIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      error: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
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
    console.log('whatUp');
    Meteor.loginWithPassword(this.state.username, this.state.password, (error) => {
      if (error) {
        this.setState({
          error: true,
        });
      } else {
        FlowRouter.go('/admin/suggestions');
      }
    });
  }

  handleChangePassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  handleChangeUsername(e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  }
  render() {
    return (
      <div className="flexJustifyContentCenter flexDisplay" style={{ height: window.innerHeight }}>
        <div className="inner welcome-container">
          <div className="" style={{ float: 'left', width: '100%' }}>
            <div className="center center-text">
              <div style={{ display: 'inline-block' }}>
                <h3 className="center-text center mdl-color-text--grey-100" style={{ marginBottom: 0, lineHeight: 0 }}>Administrator?</h3>
              </div>
            </div>
          </div>
          <div className="center center-text" style={{ float: 'left', clear: 'left', width: '100%' }}>
            <form className="style-5" onSubmit={this.handleSubmit} >
              <input style={{ margin: '20px 0 20px 0' }} onChange={this.handleChangeUsername} placeholder="Brukernavn..." value={this.state.username} type="text" />
              <input style={{ margin: '20px 0 20px 0' }} onChange={this.handleChangePassword} placeholder="Passord..." value={this.state.password} type="password" />
              {this.state.error ? <p className="mdl-color-text--red-300">Feil brukernavn/passord</p> : ''}
              <button ref="button" onClick={this.handleSubmit} style={{ fontSize: 18 }} className="mdl-button mdl-js-button mdl-js-ripple-effect submit">Logg inn</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

