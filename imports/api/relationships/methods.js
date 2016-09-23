import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Relationships } from './relationships.js';
import { People } from '../people/people.js';

export const insert = new ValidatedMethod({
  name: 'relationships.insert',
  validate: new SimpleSchema({
    name1: { type: String },
    name2: { type: String },
    type: { type: String },
  }).validator(),
  run({ name1, name2, type }) {
    let relationship;
    let person1 = People.findOne({ name: name1 });
    let person2 = People.findOne({ name: name2 });
    if (!person1) {
      person1 = People.insert({
        name: name1,
      });
    } else {
      person1 = person1._id;
    }
    if (!person2) {
      person2 = People.insert({
        name: name2,
      });
    } else {
      person2 = person2._id;
    }

    if (Meteor.userId()) {
      relationship = {
        people: [person1, person2],
        type,
        date: new Date(),
        approved: true,
      };
    } else {
      relationship = {
        people: [person1, person2],
        type,
        date: new Date(),
        approved: false,
      };
    }
    return Relationships.insert(relationship);
  },
});

export const remove = new ValidatedMethod({
  name: 'relationships.remove',
  validate: new SimpleSchema({
    relationshipId: { type: String },
  }).validator(),
  run({ relationshipId }) {
    Relationships.remove(relationshipId);
  },
});


const COMMENTS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(COMMENTS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
