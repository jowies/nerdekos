import { Meteor } from 'meteor/meteor';
import { Relationships } from '../relationships.js';

Meteor.publish('relationships.approved', () => {
  Relationships.find({ approved: true });
});

Meteor.publish('relationships.pending', () => {
  if (!this.userId) {
    return this.ready();
  }
  return Relationships.find({ approved: false });
});

Meteor.publish('relationships.all', () => {
  Relationships.find({});
});