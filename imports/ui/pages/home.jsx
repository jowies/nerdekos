import React from 'react';
import NodeMap from '../components/node_map.jsx';
import vis from 'vis';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.edges = new vis.DataSet();
    this.nodes = new vis.DataSet();
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
      || document.body.clientWidth) <= 1024) {
      return 56;
    }
    return 64;
  }

  render() {
    return (
      <div
        className=""
      >
        {this.props.loading ? <p>Loading..</p> : <NodeMap people={this.props.people} relationships={this.props.relationships} height={this.getHeight()} nodes={this.nodes} edges={this.edges} />}
      </div>
    );
  }
}

Home.propTypes = {
  relationships: React.PropTypes.array,
  people: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
