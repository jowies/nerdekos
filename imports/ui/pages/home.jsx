import React from 'react';
import NodeMap from '../components/node_map.jsx';
import vis from 'vis';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.edges = new vis.DataSet();
    this.nodes = new vis.DataSet();
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    this.props.relationships.forEach((relationship) => {
      const edge = {
        id: relationship._id,
        from: relationship.people[0],
        to: relationship.people[1],
      };
      this.edges.add(edge);
    });
    this.props.people.forEach((person) => {
      const node = {
        id: person._id,
        label: person.name,
      };
      this.nodes.add(node);
    });
  }

  componentDidUpdate() {
    this.props.relationships.forEach((relationship) => {
      if (!this.edges.get(relationship._id)) {
        const edge = {
          id: relationship._id,
          from: relationship.people[0],
          to: relationship.people[1],
        };
        this.edges.add(edge);
      }
    });
    this.props.people.forEach((person) => {
      if (!this.nodes.get(person._id)) {
        const node = {
          id: person._id,
          label: person.name,
        };
        this.nodes.add(node);
      }
    });
  }

  getHeight() {
    if ((window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth) >= 840) {
      return 64;
    }
    return 56;
  }

  click(network, data) {
    if (data.nodes[0]) {
      network.focus(data.nodes[0], {
        scale: 0.95,
        animation: {
          duration: 500,
          easingFunction: 'easeInOutQuad',
        },
      });
    } else {
      network.fit({
        animation: {
          duration: 500,
          easingFunction: 'easeInOutQuad',
        },
      });
    }
  }

  render() {
    return (
      <div
        className=""
      >
        {this.props.loading ? <p>Loading..</p> : <NodeMap height={this.getHeight()} click={this.click} nodes={this.nodes} edges={this.edges} />}
      </div>
    );
  }
}

Home.propTypes = {
  relationships: React.PropTypes.array,
  people: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
