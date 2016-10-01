import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';


export default class NodeMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnMount() {
  }


  render() {
    return (
        <div style={{ height: window.innerHeight - this.props.height }} className="info-container">
          <div className="info-color">
          </div>
        </div>
  );
  }
}

NodeMap.propTypes = {
  info: React.PropTypes.object,
  height: React.PropTypes.number,
};
