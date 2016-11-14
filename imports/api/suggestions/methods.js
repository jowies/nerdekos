import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import { Suggestions } from './suggestions.js';
import { People } from '../people/people.js';
import { Relationships } from '../relationships/relationships.js';

export const insert = new ValidatedMethod({
  name: 'suggestions.insert',
  validate: new SimpleSchema({
    people: { type: [Object], maxCount: 2 },
    type: { type: String },
    comment: { type: String, optional: true },
    'people.$.firstname': {
      type: String,
    },
    'people.$.lastname': {
      type: String,
    },
  }).validator(),
  run({ people, type, comment }) {
    const suggestion = {};
    suggestion.people = people;
    suggestion.type = type;
    if (!!comment) {
      suggestion.comment = comment;
    }
    const peopleReverse = [people[1], people[0]];
    const alreadyExists = Suggestions.findOne({ people, type, resolved: false, duplicate: false });
    const alreadyExistsReverse = Suggestions.findOne({ people: peopleReverse, type, resolved: false, duplicate: false });
    if (!!alreadyExists || !!alreadyExistsReverse) {
      suggestion.duplicate = true;
      Suggestions.insert(suggestion);
      return 'Forslaget er allerede registrert, hvis det ikke er på kartet, er det fordi det er under vurdering av admin.';
    }
      
    const person0 = People.findOne({ firstname: people[0].firstname, lastname: people[0].lastname });
    if (!!person0) {
      const person1 = People.findOne({ firstname: people[1].firstname, lastname: people[1].lastname });
      if (!!person1) {
        const relationships = Relationships.findOne({ people: person0._id });
        if (!!relationships) {
          if (_.contains(relationships.people, person1._id)) {
            if (relationships.type === type) {
              suggestion.duplicate = true;
              Suggestions.insert(suggestion);
              return 'Forslaget er allerede registrert, hvis det ikke er på kartet, er det fordi det er under vurdering av admin.';
            }
          }
        }
      }
    }
    suggestion.duplicate = false;
    Suggestions.insert(suggestion);
    return 'Forslaget er registrert, det vil bli lagt til etter vurdering av admin.';
  },
});

export const remove = new ValidatedMethod({
  name: 'suggestions.remove',
  validate: new SimpleSchema({
    suggestionId: { type: String },
  }).validator(),
  run({ suggestionId }) {
    Suggestions.update(suggestionId, { $set: { removed: true, resolved: true } });
  },
});


const SUGGESTIONS_METHODS = _.pluck([
  insert,
  remove,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(SUGGESTIONS_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
