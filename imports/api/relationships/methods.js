import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Relationships } from './relationships.js';
import { People } from '../people/people.js';
import { Suggestions } from '../suggestions/suggestions.js';

export const insert = new ValidatedMethod({
  name: 'relationships.insert',
  validate: new SimpleSchema({
    peopleIds: { type: [String] },
    type: { type: String },
  }).validator(),
  run({ peopleIds, type }) {
    const person1 = People.findOne(peopleIds[0]);
    const person2 = People.findOne(peopleIds[1]);
    
    const relationship = Relationships.findOne({ people: { $all: [peopleIds[0], peopleIds[1]] } });
    console.log(person1);
    console.log(person2);
    if (person1 && person2 && Meteor.userId()) {
      Suggestions.update({
        resolved: false,
        people: {
          $all: [
            {
              firstname: person1.firstname,
              lastname: person1.lastname,
            },
            {
              firstname: person2.firstname,
              lastname: person2.lastname,
            },
          ],
        },
      }, { $set: { resolved: true } });
      if (relationship) {
        return Relationships.update({ _id: relationship._id }, { $set: { type } });
      }
      const newrelationship = Relationships.insert({ people: [person1._id, person2._id], type, addedBy: Meteor.userId() });
      People.update(person1, { $addToSet: { relationships: newrelationship } });
      People.update(person2, { $addToSet: { relationships: newrelationship } });
      return newrelationship;
    }

    return 'error';
  },
});

export const remove = new ValidatedMethod({
  name: 'relationships.remove',
  validate: new SimpleSchema({
    relationshipId: { type: String },
  }).validator(),
  run({ relationshipId }) {
    const relationship = Relationships.findOne(relationshipId);
    if (Meteor.userId) {
      People.update({ relationships: { $in: [relationship.people[0], relationship.people[1]] } }, { $pullAll: { relationships: relationship._id } });
      Relationships.remove(relationshipId);
    }
  },
});


const RELATIONSHIPS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(RELATIONSHIPS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
