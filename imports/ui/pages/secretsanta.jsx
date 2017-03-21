import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { getName } from '../../api/ss/methods.js';

export default class SecretSanta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: true,
      name: '',
      secrets: '',
      error: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    getName.call({ person: this.state.name }, (error, res) => {
      if (error) {
        this.setState({
          error: true,
        });
      } else {
        console.log(res);
        this.setState({ secrets: res, input: false });
      }
    });
  }

  handleChangeName(e) {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  renderName() {
    return (
      <div className="" style={{ float: 'left', width: '100%' }}>
        <div className="center center-text">
          <div style={{ display: 'inline-block' }}>
            <h3 className="center-text center mdl-color-text--grey-100" >Du har fått {this.state.secrets} å gi gave til</h3>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="flexJustifyContentCenter flexDisplay" style={{ height: window.innerHeight }}>
        <div className="inner welcome-container">
          <div className="" style={{ float: 'left', width: '100%' }}>
            <div className="center center-text">
              <div style={{ display: 'inline-block' }}>
                <h3 className="center-text center mdl-color-text--grey-100" >Vennligst skriv inn navnet ditt</h3>
              </div>
            </div>
          </div>
          <div className="center center-text" style={{ float: 'left', clear: 'left', width: '100%' }}>
            <form className="style-5" onSubmit={this.handleSubmit} >
              <input style={{ margin: '20px 0 20px 0' }} onChange={this.handleChangeName} placeholder="Navnet ditt..." value={this.state.name} type="text" />
              
              {this.state.error ? <p className="mdl-color-text--red-300">Error</p> : ''}
              <button ref="button" onClick={this.handleSubmit} style={{ fontSize: 18 }} className="mdl-button mdl-js-button mdl-js-ripple-effect submit">Enter</button>
            </form>
            {!this.state.input ? this.renderName() : ''}
          </div>
        </div>
      </div>
    );
  }
}

