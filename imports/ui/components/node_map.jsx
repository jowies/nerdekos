import React from 'react';
import vis from 'vis';

export default class NodeMap extends React.Component {
  constructor(props) {
    super(props);
    this.network = {};
  }

  componentDidMount() {
    const data = {
      nodes: this.props.nodes,
      edges: this.props.edges,
    };
    const container = this.refs.map;
    const options = {
      nodes: {
        shape: 'dot',
        scaling: {
          min: 10,
          max: 30,
        },
        size: 10,
        font: {
          size: 15,
          color: '#bdbdbd',
          face: 'courier',
        },
        color: '#bdbdbd',
      },
      edges: {
        smooth: false,
        width: 3,
        dashes: [2, 1],
      },
      
    };
    this.network = new vis.Network(container, data, options);
  }

  render() {
    return (
      <div
        className="demo-charts
          mdl-color--white
          mdl-shadow--2dp
          mdl-cell
          mdl-cell--12-col
          mdl-grid"
      >
        <div ref="map" className="mdl-cell--12-col" style={{ height: window.innerHeight - 150, background: '#424242' }}>
        </div>
      </div>
    );
  }
}

NodeMap.propTypes = {
  nodes: React.PropTypes.object,
  edges: React.PropTypes.object,
};
