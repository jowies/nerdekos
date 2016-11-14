import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import { insert } from '../../api/suggestions/methods.js';
import { getByFirstname } from '../../api/people/methods.js';
import AutoComplete from '../components/auto_complete.jsx';

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname1: '',
      firstname2: '',
      lastname1: '',
      lastname2: '',
      radio: '',
      width: '',
      comment: '',
      input1focus: false,
      input2focus: false,
      error: false,
      recall: '',
      people1: [],
      people2: [],
    };

    this.handleFirstname1 = this.handleFirstname1.bind(this);
    this.handleLastname1 = this.handleLastname1.bind(this);
    this.handleFirstname2 = this.handleFirstname2.bind(this);
    this.handleLastname2 = this.handleLastname2.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickLastname1 = this.clickLastname1.bind(this);
    this.clickLastname2 = this.clickLastname2.bind(this);
    this.setWidth = this.setWidth.bind(this);
    this.onBlur1Timeout = this.onBlur1Timeout.bind(this);
    this.onBlur2Timeout = this.onBlur2Timeout.bind(this);
    this.onFocus1 = this.onFocus1.bind(this);
    this.onFocus2 = this.onFocus2.bind(this);
  }

  componentDidMount() {
    upgrade(this.refs.radio1, this.refs.radio2, this.refs.button);
    this.setWidth();
    this.refs.input1.addEventListener('blur', this.onBlur1Timeout);
    this.refs.input1.addEventListener('focus', this.onFocus1);
    this.refs.input2.addEventListener('blur', this.onBlur2Timeout);
    this.refs.input2.addEventListener('focus', this.onFocus2);
  }

  componentWillUnmount() {
    downgrade(this.refs.radio1, this.refs.radio2, this.refs.button);
    this.refs.input1.removeEventListener('blur', this.onBlur1);
    this.refs.input1.removeEventListener('focus', this.onFocus1);
    this.refs.input2.removeEventListener('blur', this.onBlur2);
    this.refs.input2.removeEventListener('focus', this.onFocus2);
  }

  onBlur1Timeout() {
    setTimeout(this.onBlur1.bind(this), 100);
  }

  onBlur2Timeout() {
    setTimeout(this.onBlur2.bind(this), 100);
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

  getHeart() {
    if (this.state.radio === 'klin') {
      return <i className="big-heart material-icons mdl-color-text--red-A700" style={{ fontSize: 128 }}>favorite_border</i>;
    } else if (this.state.radio === 'ligg') {
      return <i className="big-heart material-icons mdl-color-text--red-A700" style={{ fontSize: 128 }}>favorite</i>;
    }
    return <i className="material-icons mdl-color-text--grey-700" style={{ fontSize: 128 }}>favorite_border</i>;
  }

  handleFirstname1(e) {
    e.preventDefault();
    this.setState({
      firstname1: this.toTitleCase(e.target.value),
    });
    getByFirstname.call({ firstname: e.target.value }, (err, res) => {
      if (err) {
        this.setState({
          error: true,
        });
      } else {
        this.setState({
          error: false,
          people1: res,
        });
      }
    });
  }

  handleLastname1(e) {
    e.preventDefault();
    this.setState({
      lastname1: this.toTitleCase(e.target.value),
    });
  }

  handleFirstname2(e) {
    e.preventDefault();
    this.setState({
      firstname2: this.toTitleCase(e.target.value),
    });
    getByFirstname.call({ firstname: e.target.value }, (err, res) => {
      if (err) {
        this.setState({
          error: true,
        });
      } else {
        this.setState({
          error: false,
          people2: res,
        });
      }
    });
  }

  handleLastname2(e) {
    e.preventDefault();
    this.setState({
      lastname2: this.toTitleCase(e.target.value),
    });
  }

  handleComment(e) {
    e.preventDefault();
    this.setState({
      comment: e.target.value,
    });
  }


  toTitleCase(str) {
    const lower = str.toLowerCase();
    return lower.replace(/(^([a-zA-Z\u00C0-\u00ff\p{M}]))|([ -][a-zA-Z\u00C0-\u00ff\p{M}])/g,
    (firstLetter) => firstLetter.toUpperCase()
    );
  }

  handleOptionChange(e) {
    e.preventDefault();
    this.setState({
      radio: e.target.value,
    });
    if (e.target.value === 'klin') {
      this.refs.radio1.className += ' is-checked';
      this.refs.radio2.className = this.refs.radio2.className.split(' is-checked').join('');
    }
    if (e.target.value === 'ligg') {
      this.refs.radio2.className += ' is-checked';
      this.refs.radio1.className = this.refs.radio1.className.split(' is-checked').join('');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.firstname1.length > 0 &&
      this.state.firstname1.length > 0 &&
      this.state.firstname1.length > 0 &&
      this.state.firstname1.length > 0 &&
      this.radio !== 'klin') {
      const suggestion = {};
      suggestion.people = [
        { firstname: this.state.firstname1,
          lastname: this.state.lastname1,
        },
        { firstname: this.state.firstname2,
          lastname: this.state.lastname2,
        },
      ];
      suggestion.type = this.state.radio;
      if (this.state.comment.length > 0) {
        suggestion.comment = this.state.comment;
      }
      insert.call(suggestion,
      (err, res) => {
        if (err) {
          this.setState({
            error: true,
          });
        } else {
          this.setState({
            recall: res,
            firstname1: '',
            lastname1: '',
            firstname2: '',
            lastname2: '',
            radio: '',
            comment: '',
            error: false,
          });
          this.refs.radio1.className = this.refs.radio1.className.split(' is-checked').join('');
          this.refs.radio2.className = this.refs.radio2.className.split(' is-checked').join('');
        }
      });
    } else {
      this.setState({
        error: true,
      });
    }
  }

  clickLastname1(lastname) {
    this.setState({ lastname1: lastname });
  }

  clickLastname2(lastname) {
    this.setState({ lastname2: lastname });
  }

  render() {
    return (
      <div className="flexJustifyContentCenter flexDisplay mdl-color--grey-800">
        <div >
          <div style={{ padding: 10, margin: '0 auto', marginTop: 5, width: this.state.width, textAlign: 'center' }} className="center mdl-color--grey-800 mdl-card">
            <div style={{ position: 'relative' }} className="">
              <h5 style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Person1:</h5>
              <form className="style-5" >
                <input value={this.state.firstname1} onChange={this.handleFirstname1} style={{ margin: '10px 0 20px 0' }} placeholder="Fornavn..." type="text" />
                <input ref="input1" value={this.state.lastname1} onChange={this.handleLastname1} style={{ margin: '20px 0 0 0' }} placeholder="Etternavn..." type="text" />
                {this.state.input1focus ? <AutoComplete clickName={this.clickLastname1} lastname={this.state.lastname1} firstname={this.state.firstname1} people={this.state.people1} /> : ''}
              </form>
            </div>
            <div style={{ marginTop: 20 }} >
                {this.getHeart()}
            </div>
            <div style={{ position: 'relative' }} className="">
              <h5 style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Person2:</h5>
              <form className="style-5" >
                <input value={this.state.firstname2} onChange={this.handleFirstname2} style={{ margin: '10px 0 20px 0' }} placeholder="Fornavn..." type="text" />
                <input ref="input2" value={this.state.lastname2} onChange={this.handleLastname2} style={{ margin: '20px 0 0 0' }} placeholder="Etternavn..." type="text" />
                {this.state.input2focus ? <AutoComplete clickName={this.clickLastname2} lastname={this.state.lastname2} firstname={this.state.firstname2} people={this.state.people2} /> : ''}
              </form>
            </div>
            <div className="">
              <div>
                <label style={{ marginTop: 30, marginBottom: 20 }} ref="radio1" className="mdl-radio mdl-js-radio mdl-js-ripple-effect">
                  <input onChange={this.handleOptionChange} type="radio" id="option-1" className="mdl-radio__button" name="options" value="klin" checked={this.state.radio === 'klin'} />
                  <span className="mdl-radio__label mdl-color-text--grey-100">KLIN</span>
                </label>
              </div>
              <div>
                <label ref="radio2" className="mdl-radio mdl-js-radio mdl-js-ripple-effect" >
                  <input onChange={this.handleOptionChange} type="radio" id="option-2" className="mdl-radio__button" name="options" value="ligg" checked={this.state.radio === 'ligg'} />
                  <span className="mdl-radio__label mdl-color-text--grey-100">LIGG</span>
                </label>
              </div>
            </div>
            <div className="">
              <h5 style={{ textAlign: 'left' }} className="mdl-color-text--grey-100">Kommentar:</h5>
              <textarea className="text-area" value={this.state.comment} onChange={this.handleComment} style={{ height: 100, margin: '20px 0 20px 0' }} placeholder="Her kan du skrive ting som når, hvor, sammenhenger og annet :)" type="text" />
            </div>
            {this.state.error ? <p className="mdl-color--grey-100 mdl-color-text--red-700">Det skjedde en feil, eller ikke all informasjon er fylt ut</p> : ''}
            {this.state.recall.length > 0 ? <p className="mdl-color-text--grey-100">{this.state.recall}</p> : ''}
            <button
              ref="button"
              onClick={this.handleSubmit}
              style={{ fontSize: 18 }}
              className="mdl-button mdl-js-button mdl-js-ripple-effect submit"
            >Foreslå!</button>
          </div>
        </div>
      </div>
    );
  }
}
