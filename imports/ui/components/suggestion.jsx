import React from 'react';
import { remove } from '../../api/suggestions/methods.js';
import SuggestionButtons from './suggestionbuttons.jsx';
import Globals from '../../startup/client/globals.js';
import { FlowRouter } from 'meteor/kadira:flow-router';


export default class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remove: false,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.changeToDefault = this.changeToDefault.bind(this);
    this.changeToRemove = this.changeToRemove.bind(this);
    this.goToAdd = this.goToAdd.bind(this);
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleRemove(e) {
    e.preventDefault();
    remove.call({
      suggestionId: this.props.suggestion._id,
    }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  changeToRemove(e) {
    e.preventDefault();
    this.setState({
      remove: true,
    });
  }

  changeToDefault(e) {
    e.preventDefault();
    this.setState({
      remove: false,
    });
  }

  goToAdd(e) {
    e.preventDefault();
    Globals.suggestion = this.props.suggestion;
    FlowRouter.go('/admin/add');
  }

  buttons() {
    if (this.state.remove) {
      return (
        <div className="suggestion-sub-element buttons" >
          <h4 className="mdl-color-text--grey-100">Sikker?</h4>
          <SuggestionButtons function1={this.handleRemove} function2={this.changeToDefault} label1={'Ja'} label2={'Nei'} />
        </div>
      );
    }
    return (
      <div className="suggestion-sub-element buttons" >
        <SuggestionButtons function1={this.goToAdd} function2={this.changeToRemove} label1={'Legg til'} label2={'Fjern'} />
      </div>
    );
  }

  render() {
    return (
      <div className="mdl-color--grey-900 mdl-shadow--2dp suggestion-element">
        <div className="suggestion-sub-element names">
          <h6 style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 5, textAlign: 'left' }} className="mdl-color-text--grey-100">Person 1:</h6>
          <p style={{ marginTop: 5, textAlign: 'left', fontSize: 16 }} className="mdl-color-text--grey-100">{this.props.suggestion.people[0].firstname} {this.props.suggestion.people[0].lastname}</p>
        </div>
        <div className="suggestion-sub-element names " >
          <h6 style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 5, textAlign: 'left' }} className="mdl-color-text--grey-100">Person 2:</h6>
          <p style={{ marginTop: 5, textAlign: 'left', fontSize: 16 }} className="mdl-color-text--grey-100">{this.props.suggestion.people[1].firstname} {this.props.suggestion.people[1].lastname}</p>
        </div>
        <div className="suggestion-sub-element type" >
          <h6 style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 5, textAlign: 'left' }} className="mdl-color-text--grey-100">Type:</h6>
          <p style={{ marginTop: 5, textAlign: 'left', fontSize: 16 }} className="mdl-color-text--grey-100">{this.capitalize(this.props.suggestion.type)}</p>
        </div>
        <div className="suggestion-sub-element comment" >
          <h6 style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 5, textAlign: 'left' }} className="mdl-color-text--grey-100">Kommentar:</h6>
          <p style={{ marginTop: 5, textAlign: 'left', fontSize: 16 }} className="mdl-color-text--grey-100">{!!this.props.suggestion.comment ? this.props.suggestion.comment : 'Ingen kommentar gitt'}</p>
        </div>
        {this.buttons()}
      </div>
    );
  }
}

Suggestion.propTypes = {
  suggestion: React.PropTypes.object,
};
