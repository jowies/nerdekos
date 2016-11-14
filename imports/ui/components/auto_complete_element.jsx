import React from 'react';


export default class AutoCompleteElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={this.props.clickName} className="auto-suggest-element">
          {this.props.person.lastname}
      </div>
    );
  }
}

AutoCompleteElement.propTypes = {
  person: React.PropTypes.object,
  clickName: React.PropTypes.func,
};
