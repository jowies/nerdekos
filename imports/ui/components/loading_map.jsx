import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';


export default class NodeMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    upgrade(this.refs.loading);
  }

  componentDidUpdate() {
    upgrade(this.refs.loading);
  }

  componentWillUnmount() {
    downgrade(this.refs.loading);
  }

  render() {
    return (
      <div
        id="loadingBar"
        className="flexJustifyContentCenter flexDisplay"
        style={{ position: 'absolute', width: '100%', height: window.innerHeight - this.props.height }}
      >
        <div className="inner">
          <div className="flexJustifyContentCenter flexDisplay">
            <div
              ref="loading"
              className="mdl-spinner
                mdl-spinner--single-color
                mdl-js-spinner
                is-active
                inner"
              style={{ margin: 'auto' }}
            >
            </div>
          </div>
          <h6 className="center">Loading the
            <span className="mdl-color-text--red-A700"> LOVE</span>
          </h6>
        </div>
      </div>
  );
  }
}

NodeMap.propTypes = {
  nodes: React.PropTypes.object,
  edges: React.PropTypes.object,
  height: React.PropTypes.number,
};
