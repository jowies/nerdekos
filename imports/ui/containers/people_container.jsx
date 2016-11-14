import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { People } from '../../api/people/people.js';
import Suggestion from '../pages/suggestion.jsx';

const PeopleContainer = createContainer(() => {
  const peopleHandle = Meteor.subscribe('people.all');
  const loading = !peopleHandle.ready();
  return {
    loading,
    connected: Meteor.status().connected,
    people: People.find().fetch(),
  };
}, Suggestion);

export default PeopleContainer;
