import React from 'react';
import vis from 'vis';
import Loading from './loading_map.jsx';
import Info from './info.jsx';
import { getInfo } from '../helpers/info.js';

export default class NodeMap extends React.Component {
  constructor(props) {
    super(props);
    this.network = {};
    this.options = {
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
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.003,
          springLength: 50,
          springConstant: 0.03,
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 1.50,
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 25,
        },
      },
    };
    this.state = {
      loading: true,
      info: false,
    };

    this.click = this.click.bind(this);
    this.stabilized = this.stabilized.bind(this);
  }

  componentDidMount() {
    const data = {
      nodes: this.props.nodes,
      edges: this.props.edges,
    };
    const container = this.refs.map;
    this.network = new vis.Network(container, data, this.options);
    this.network.on('stabilized', this.stabilized);
    this.network.on('click', this.click);
  }

  stabilized(params) {
    if (this.state.loading && params.iterations > 10) {
      this.network.fit({
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad',
        },
      });
      this.setState({
        loading: false,
      });
      console.log('running');
    }
  }

  click(data) {
    if (data.nodes[0]) {
      getInfo({ id: data.nodes[0], people: this.props.people, relationships: this.props.relationships });
      this.network.focus(data.nodes[0], {
        scale: 0.95,
        animation: {
          duration: 500,
          easingFunction: 'easeInOutQuad',
        },
      });
      this.setState({ info: true });
    } else {
      this.network.fit({
        animation: {
          duration: 500,
          easingFunction: 'easeInOutQuad',
        },
      });
      this.setState({ info: false });
    }
  }

  ovarlay() {
    if (this.state.loading) {
      return <Loading height={this.props.height} />;
    } else if (this.state.info) {
      return <Info people={this.props.people} relationships={this.props.relationships} height={this.props.height} />;
    }
    return '';
  }

  render() {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ width: '100%' }}>
          <div
            className=""
            ref="map"
            style={{
              width: '100%',
              height: window.innerHeight - this.props.height,
              background: '#424242',
            }}
          >
          </div>
        </div>
        {this.ovarlay()}
      </div>
    );
  }
}

NodeMap.propTypes = {
  nodes: React.PropTypes.object,
  edges: React.PropTypes.object,
  click: React.PropTypes.func,
  height: React.PropTypes.number,
  people: React.PropTypes.array,
  relationships: React.PropTypes.array,
};
