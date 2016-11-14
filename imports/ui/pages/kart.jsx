import React from 'react';
import NodeMap from '../components/node_map.jsx';
import vis from 'vis';

export default class Kart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 56,
    };
    this.edges = new vis.DataSet();
    this.nodes = new vis.DataSet();
    this.setHeight = this.setHeight.bind(this);
  }

  componentWillMount() {
    this.setHeight();
  }

  componentDidMount() {
    this.props.relationships.forEach((relationship) => {
      const edge = {
        id: relationship._id,
        from: relationship.people[0],
        to: relationship.people[1],
      };
      if (relationship.type === 'klin') {
        edge.dashes = [8, 1, 8, 1];
      }
      if (relationship.type === 'ligg') {
        edge.dashes = false;
      }
      this.edges.add(edge);
    });
    this.props.people.forEach((person) => {
      const node = {
        id: person._id,
        label: person.firstname,
      };
      if (this.props.admin) {
        node.label = person.firstname + ' ' + person.lastname;
      }
      this.nodes.add(node);
    });
    window.addEventListener('resize', this.setHeight);
  }

  componentWillReceiveProps(nextProps) {
    const oldRelationships = new Set(this.props.relationships);
    const oldPeople = new Set(this.props.people);
    const addRelationships = nextProps.relationships.filter(relationship => !oldRelationships.has(relationship));
    const addPeople = nextProps.people.filter(person => !oldPeople.has(person));

    addRelationships.forEach((relationship) => {
      if (!this.edges.get(relationship._id)) {
        const edge = {
          id: relationship._id,
          from: relationship.people[0],
          to: relationship.people[1],
        };
        if (relationship.type === 'klin') {
          edge.dashes = [4, 8];
        }
        if (relationship.type === 'ligg') {
          edge.dashes = false;
        }
        this.edges.add(edge);
      }
    });
    addPeople.forEach((person) => {
      if (!this.nodes.get(person._id)) {
        const node = {
          id: person._id,
          label: person.firstname,
        };
        if (this.props.admin) {
          node.label = person.firstname + ' ' + person.lastname;
        }
        this.nodes.add(node);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight);
  }

  setHeight() {
    this.setState({
      height: this.getHeight(),
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

  isInRelationship(id, relationships) {
    for (let i = 0; i < relationships.length; i++) {
      if (id === relationships[i].people[0] || id === relationships[i].people[1]) {
        return true;
      }
    }
    return false;
  }

  isPerson(id, people) {
    for (let i = 0; i < people.length; i++) {
      if (id === people[i]._id) {
        return true;
      }
    }
    return false;
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

Kart.propTypes = {
  relationships: React.PropTypes.array,
  people: React.PropTypes.array,
  loading: React.PropTypes.bool,
  admin: React.PropTypes.bool,
};
