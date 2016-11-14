import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';

export default class SuggestionButtons extends React.Component {
  componentDidMount() {
    upgrade(this.refs.one, this.refs.two);
  }

  componentWillUnmount() {
    downgrade(this.refs.one, this.refs.two);
  }

  render() {
    return (
      <div>
        <button
          ref="one"
          onClick={this.props.function1}
          style={{ fontSize: 18 }}
          className="mdl-button mdl-js-button mdl-js-ripple-effect submit"
        >{this.props.label1}</button>
        <button
          ref="two"
          onClick={this.props.function2}
          style={{ fontSize: 18 }}
          className="mdl-button mdl-js-button mdl-js-ripple-effect submit"
        >{this.props.label2}</button>
      </div>
    );
  }
}

SuggestionButtons.propTypes = {
  function1: React.PropTypes.func,
  function2: React.PropTypes.func,
  label1: React.PropTypes.string,
  label2: React.PropTypes.string,
};
