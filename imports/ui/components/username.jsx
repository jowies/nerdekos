import React from 'react';

export default class Username extends React.Component {
  render() {
    return this.props.loading ? '' : <span>{this.props.user.username}</span>;
  }
}

Username.propTypes = {
  user: React.PropTypes.object,
  loading: React.PropTypes.boolean,
};
