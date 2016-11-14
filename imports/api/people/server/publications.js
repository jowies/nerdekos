import { Meteor } from 'meteor/meteor';
import { People } from '../people.js';

Meteor.publish('people.relevant', () => {
  return People.find({ 'relationships.0': { $exists: true } }, { fields: { lastname: 0 } });
});


Meteor.publish('people.all', function () {
  if (!this.userId) {
    return this.ready();
  }
  return People.find({});
});
