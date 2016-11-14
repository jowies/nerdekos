import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { insert } from '../../api/people/methods.js';
import { insert as insertrelationships } from '../../api/relationships/methods.js';
import AutoComplete from '../components/auto_complete.jsx';
import { _ } from 'meteor/underscore';
import Globals from '../../startup/client/globals.js';

export default class Add extends React.Component {
  constructor(props) {
    super(props);

    if (!!Globals.suggestion.people) {
      const suggestion = Globals.suggestion;
      this.state = {
        firstname1: suggestion.people[0].firstname,
        lastname1: suggestion.people[0].lastname,
        firstname2: suggestion.people[1].firstname,
        lastname2: suggestion.people[1].lastname,
        radio: suggestion.type,
        width: '',
        input1focus: false,
        input2focus: false,
        error: false,
        recall: '',
        person1exists: false,
        person2exists: false,
        hookexists: false,
      };
    } else {
      this.state = {
        firstname1: '',
        firstname2: '',
        lastname1: '',
        lastname2: '',
        radio: '',
        width: '',
        input1focus: false,
        input2focus: false,
        error: false,
        recall: '',
        person1exists: false,
        person2exists: false,
        hookexists: false,
      };
    }
    Globals.suggestion = {};
    this.handleFirstname1 = this.handleFirstname1.bind(this);
    this.handleLastname1 = this.handleLastname1.bind(this);
    this.handleFirstname2 = this.handleFirstname2.bind(this);
    this.handleLastname2 = this.handleLastname2.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.addRelationship = this.addRelationship.bind(this);
    this.addPerson1 = this.addPerson1.bind(this);
    this.addPerson2 = this.addPerson2.bind(this);
    this.clickLastname1 = this.clickLastname1.bind(this);
    this.clickLastname2 = this.clickLastname2.bind(this);
    this.setWidth = this.setWidth.bind(this);
    this.onBlur1Timeout = this.onBlur1Timeout.bind(this);
    this.onBlur2Timeout = this.onBlur2Timeout.bind(this);
    this.onFocus1 = this.onFocus1.bind(this);
    this.onFocus2 = this.onFocus2.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.radio1, this.refs.radio2, this.refs.hook, this.refs.person1, this.refs.person2);
    this.setWidth();
    this.refs.input1.addEventListener('blur', this.onBlur1Timeout);
    this.refs.input1.addEventListener('focus', this.onFocus1);
    this.refs.input2.addEventListener('blur', this.onBlur2Timeout);
    this.refs.input2.addEventListener('focus', this.onFocus2);
    this.processChanges(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.processChanges(nextProps);
  }

  componentWillUnmount() {
    downgrade(this.refs.radio1, this.refs.radio2, this.refs.hook, this.refs.person1, this.refs.person2);
    this.refs.input1.removeEventListener('blur', this.onBlur1Timeout);
    this.refs.input1.removeEventListener('focus', this.onFocus1);
    this.refs.input2.removeEventListener('blur', this.onBlur2Timeout);
    this.refs.input2.removeEventListener('focus', this.onFocus2);
  }

  onBlur1Timeout() {
    setTimeout(this.onBlur1.bind(this), 150);
  }

  onBlur2Timeout() {
    setTimeout(this.onBlur2.bind(this), 150);
  }

  getPerson(person, list) {
    for (let i = 0; i < list.length; i = i + 1) {
      if (list[i].firstname === person.firstname) {
        if (list[i].lastname === person.lastname) {
          return list[i];
        }
      }
    }
    return false;
  }

  getRelationship(person1, person2, list) {
    for (let i = 0; i < list.length; i = i + 1) {
      if (_.include(list[i].people, person1._id) &&
        _.include(list[i].people, person2._id)) {
        return list[i];
      }
    }
    return false;
  }

  processChanges(propsargs) {
    let props = propsargs;
    if (!props) {
      props = this.props;
    }
    const person1 = this.getPerson({ firstname: this.state.firstname1, lastname: this.state.lastname1 }, props.people);
    if (person1) {
      this.setState({
        person1exists: person1,
      });
    } else {
      this.setState({
        person1exists: false,
      });
    }
    const person2 = this.getPerson({ firstname: this.state.firstname2, lastname: this.state.lastname2 }, props.people);
    if (person2) {
      this.setState({
        person2exists: person2,
      });
    } else {
      this.setState({
        person2exists: false,
      });
    }
    if (person1 && person2) {
      const relationship = this.getRelationship(person1, person2, props.relationships);
      if (relationship) {
        this.setState({
          hookexists: relationship,
        });
      }
    }
  }

  onBlur1() {
    this.setState({
      input1focus: false,
    });
  }

  onBlur2() {
    this.setState({
      input2focus: false,
    });
  }

  onFocus1() {
    this.setState({
      input1focus: true,
    });
  }

  onFocus2() {
    this.setState({
      input2focus: true,
    });
  }

  setWidth() {
    this.setState({
      width: this.getWidth(),
    });
  }

  getWidth() {
    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    if (width < 600) {
      return width;
    }
    return 400;
  }

  toTitleCase(str) {
    const lower = str.toLowerCase();
    return lower.replace(/(^([a-zA-Z\u00C0-\u00ff\p{M}]))|([ -][a-zA-Z\u00C0-\u00ff\p{M}])/g,
    (firstLetter) => firstLetter.toUpperCase()
    );
  }

  handleFirstname1(e) {
    e.preventDefault();
    this.setState({
      firstname1: this.toTitleCase(e.target.value),
    }, this.processChanges);
  }

  handleLastname1(e) {
    e.preventDefault();
    this.setState({
      lastname1: this.toTitleCase(e.target.value),
    }, this.processChanges);
  }

  handleFirstname2(e) {
    e.preventDefault();
    this.setState({
      firstname2: this.toTitleCase(e.target.value),
    }, this.processChanges);
  }

  handleLastname2(e) {
    e.preventDefault();
    this.setState({
      lastname2: this.toTitleCase(e.target.value),
    }, this.processChanges);
  }

  handleComment(e) {
    e.preventDefault();
    this.setState({
      comment: e.target.value,
    });
  }

  handleOptionChange(e) {
    e.preventDefault();
    this.setState({
      radio: e.target.value,
    }, this.processChanges);
    if (e.target.value === 'klin') {
      this.refs.radio1.className += ' is-checked';
      this.refs.radio2.className = this.refs.radio2.className.split(' is-checked').join('');
    }
    if (e.target.value === 'ligg') {
      this.refs.radio2.className += ' is-checked';
      this.refs.radio1.className = this.refs.radio1.className.split(' is-checked').join('');
    }
  }

  addRelationship(e) {
    e.preventDefault();
    const relationship = {
      peopleIds: [
        this.state.person1exists._id,
        this.state.person2exists._id,
      ],
      type: this.state.radio,
    };
    console.log(relationship);
    insertrelationships.call(relationship, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          radio: '',
        }, this.processChanges);
        this.refs.radio1.className = this.refs.radio1.className.split(' is-checked').join('');
        this.refs.radio2.className = this.refs.radio2.className.split(' is-checked').join('');
      }
    });
  }

  addPerson1(e) {
    e.preventDefault();
    const person = {
      firstname: this.state.firstname1,
      lastname: this.state.lastname1,
    };
    insert.call({ person }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        if (!!res) {
          this.setState({
            person1exists: { _id: res },
          });
        }
      }
    });
  }

  addPerson2(e) {
    e.preventDefault();
    const person = {
      firstname: this.state.firstname2,
      lastname: this.state.lastname2,
    };
    insert.call({ person }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        if (!!res) {
          this.setState({
            person2exists: { _id: res },
          });
        }
      }
    });
  }

  clickLastname1(lastname) {
    this.setState({ lastname1: lastname }, this.processChanges);
  }

  clickLastname2(lastname) {
    this.setState({ lastname2: lastname }, this.processChanges);
  }

  getStatus1() {
    if (!!this.state.person1exists) {
      return <p style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Denne personen er lagt til</p>;
    }
    return <p style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Denne personen ligger ikke i systemet</p>;
  }
  getStatus2() {
    if (!!this.state.person2exists) {
      return <p style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Denne personen er lagt til</p>;
    }
    return <p style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Denne personen ligger ikke i systemet</p>;
  }

  getStatusHook() {
    if (!!this.state.hookexists) {
      return <p style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Disse to har et hook av typen "{this.state.hookexists.type}"</p>;
    }
    return <p style={{ marginBottom: 0, textAlign: 'left' }} className="mdl-color-text--grey-100">Disse to har ikke et hook i systemet enda</p>;
  }

  render() {
    return (
      <div className="flexJustifyContentCenter flexDisplay mdl-color--grey-800">
        {this.props.connected ? '' : <p>Not connected</p>}
        <div >
          <div style={{ padding: 10, margin: '0 auto', marginTop: 5, width: this.state.width, textAlign: 'center' }} className="center mdl-color--grey-800 mdl-card">
            <div style={{ position: 'relative' }} className="">
              <h5 style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Person1:</h5>
              {this.getStatus1()}
              <form className="style-5" >
                <input value={this.state.firstname1} onChange={this.handleFirstname1} style={{ margin: '10px 0 20px 0' }} placeholder="Fornavn..." type="text" />
                <input ref="input1" value={this.state.lastname1} onChange={this.handleLastname1} style={{ margin: '20px 0 0 0' }} placeholder="Etternavn..." type="text" />
                {(!this.props.loading && this.state.input1focus) ? <AutoComplete clickName={this.clickLastname1} lastname={this.state.lastname1} firstname={this.state.firstname1} people={this.props.people} /> : ''}
              </form>
            </div>
            <button
              ref="person1"
              onClick={this.addPerson1}
              style={{ fontSize: 18 }}
              className="mdl-button mdl-js-button mdl-js-ripple-effect submit"
              disabled={this.state.person1exists}
            >Legg til person</button>
            <div style={{ position: 'relative' }} className="">
              <h5 style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Person2:</h5>
              {this.getStatus2()}
              <form className="style-5" >
                <input value={this.state.firstname2} onChange={this.handleFirstname2} style={{ margin: '10px 0 20px 0' }} placeholder="Fornavn..." type="text" />
                <input ref="input2" value={this.state.lastname2} onChange={this.handleLastname2} style={{ margin: '20px 0 0 0' }} placeholder="Etternavn..." type="text" />
                {(!this.props.loading && this.state.input2focus) ? <AutoComplete clickName={this.clickLastname2} lastname={this.state.lastname2} firstname={this.state.firstname2} people={this.props.people} /> : ''}
              </form>
            </div>
            <button
              ref="person2"
              onClick={this.addPerson2}
              style={{ fontSize: 18 }}
              className="mdl-button mdl-js-button mdl-js-ripple-effect submit"
              disabled={this.state.person2exists}
            >Legg til person</button>
            <div className="">
              <div>
                <label style={{ marginTop: 30, marginBottom: 20 }} ref="radio1" className="mdl-radio mdl-js-radio mdl-js-ripple-effect">
                  <input onChange={this.handleOptionChange} type="radio" id="option-1" className="mdl-radio__button" name="options" value="klin" checked={this.state.radio === 'klin'} />
                  <span className="mdl-radio__label mdl-color-text--grey-100">KLIN</span>
                </label>
              </div>
              <div>
                <label style={{ marginBottom: 20 }} ref="radio2" className="mdl-radio mdl-js-radio mdl-js-ripple-effect" >
                  <input onChange={this.handleOptionChange} type="radio" id="option-2" className="mdl-radio__button" name="options" value="ligg" checked={this.state.radio === 'ligg'} />
                  <span className="mdl-radio__label mdl-color-text--grey-100">LIGG</span>
                </label>
              </div>
            </div>
            {this.state.error ? <p className="mdl-color--grey-100 mdl-color-text--red-700">Det skjedde en feil, eller ikke all informasjon er fylt ut</p> : ''}
            {this.state.recall.length > 0 ? <p className="mdl-color-text--grey-100">{this.state.recall}</p> : ''}
            {this.getStatusHook()}
            <button
              ref="hook"
              onClick={this.addRelationship}
              style={{ fontSize: 18 }}
              className="mdl-button mdl-js-button mdl-js-ripple-effect submit"
            >Legg til hook</button>
          </div>
        </div>
      </div>
    );
  }
}

Add.propTypes = {
  people: React.PropTypes.array,
  relationships: React.PropTypes.array,
  loading: React.PropTypes.bool,
  connected: React.PropTypes.bool,
};
