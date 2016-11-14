import React from 'react';
import AutoCompleteElement from './auto_complete_element.jsx';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    const peopleWithFirstname = this.peopleWithFirstname(props.people, props.firstname);
    this.state = {
      peoplecache: peopleWithFirstname,
      people: this.getRelevantPeople(peopleWithFirstname, props.lastname),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.firstname !== nextProps.firstname) {
      const peopleWithFirstname = this.peopleWithFirstname(nextProps.people, nextProps.firstname);
      this.setState({
        peoplecache: peopleWithFirstname,
        people: this.getRelevantPeople(peopleWithFirstname, nextProps.lastname),
      });
    } else {
      this.setState({
        people: this.getRelevantPeople(this.state.peoplecache, nextProps.lastname),
      });
    }
  }

  getRelevantPeople(hasFirstname, lastname) {
    const firstRelevant = [];
    for (let i = 0; i < hasFirstname.length; i++) {
      if (this.isSubstring(lastname, hasFirstname[i].lastname)) {
        firstRelevant.push(hasFirstname[i]);
      }
      if (firstRelevant.length === 3) {
        break;
      }
    }
    return firstRelevant;
  }

  isSubstring(substring, string) {
    return string.indexOf(substring) !== -1;
  }

  peopleWithFirstname(people, firstname) {
    return people.filter(person => person.firstname === firstname);
  }

  names() {
    return this.state.people.map((person) => {
      const click = this.props.clickName.bind(undefined, person.lastname);
      return <AutoCompleteElement key={person._id} person={person} clickName={click} />;
    });
  }

  render() {
    return (
      <div style={{ zIndex: 100, width: '100%', position: 'absolute' }} id="lastnamelist">
        {this.names()}
      </div>
    );
  }
}

AutoComplete.propTypes = {
  people: React.PropTypes.array,
  firstname: React.PropTypes.string,
  lastname: React.PropTypes.string,
  focus: React.PropTypes.bool,
  clickName: React.PropTypes.func,
};
