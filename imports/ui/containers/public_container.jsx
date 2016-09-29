import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { People } from '../../api/people/people.js';
import { Relationships } from '../../api/relationships/relationships.js';
import Home from '../pages/home.jsx';

const PublicContainer = createContainer(() => {
  const peopleHandle = Meteor.subscribe('people.all');
  const relationshipsHandle = Meteor.subscribe('relationships.all');
  const loading = !peopleHandle.ready && !relationshipsHandle.ready;
  return {
    loading,
    connected: Meteor.status().connected,
    people: People.find().fetch(),
    relationships: Relationships.find().fetch(),
  };
}, Home);

export default PublicContainer;
