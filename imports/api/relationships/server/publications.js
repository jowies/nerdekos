import { Meteor } from 'meteor/meteor';
import { Relationships } from '../relationships.js';

Meteor.publish('relationships.all', () => {
  return Relationships.find({});
});
