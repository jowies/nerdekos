import React from 'react';
import vis from 'vis';
import Loading from './loading_map.jsx';

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
    };

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
    this.network.on('click', this.props.click.bind(undefined, this.network));
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
    }
    console.log(params.iterations);
  }

  loading() {
    if (this.state.loading) {
      return <Loading height={this.props.height} />;
    }
    return '';
  }

  render() {
    return (
      <div className="">
        <div
          className=""
          ref="map"
          style={{
            width: '100%',
            height: window.innerHeight - this.props.height,
            background: '#424242',
            position: 'absolute',
          }}
        >
        </div>
        {this.loading()}
      </div>
    );
  }
}

NodeMap.propTypes = {
  nodes: React.PropTypes.object,
  edges: React.PropTypes.object,
  click: React.PropTypes.func,
  height: React.PropTypes.number,
};
