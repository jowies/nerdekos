import { Meteor } from 'meteor/meteor';
import { People } from '../people.js';

Meteor.publish('people.all', () => {
  return People.find({});
});


Meteor.publish('people.relevant', () => {
  return People.find({ approvedRelationships: 0 });
});
