import React from 'react';

import Suggestion from '../components/suggestion.jsx';

export default class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '',
    };
  }

  componentDidMount() {
    this.setWidth();
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
    if (width < 1080) {
      return width;
    }
    return 1080;
  }

  renderSuggestions() {
    return this.props.suggestions.map((suggestion) => {
      return <Suggestion key={suggestion._id} suggestion={suggestion} />;
    });
  }

  renderNoList() {
    return <h1>No pending suggestions</h1>;
  }

  render() {
    return (
      <div className="flexJustifyContentCenter flexDisplay mdl-color--grey-800">
        <div style={{ boxSizing: 'border-box', padding: '0px 10px 10px 10px', width: this.state.width, textAlign: 'center' }} className="mdl-color--grey-800">
            {!this.props.loading && this.props.suggestions.length > 0 ? this.renderSuggestions() : this.renderNoList()}
        </div>
      </div>
    );
  }
}

Suggestions.propTypes = {
  suggestions: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
