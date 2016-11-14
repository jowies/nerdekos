import { Meteor } from 'meteor/meteor';
import { Suggestions } from '../suggestions.js';

Meteor.publish('suggestions.unResolved', () => {
  return Suggestions.find({ resolved: false, duplicate: false });
});
