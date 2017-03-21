import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { SS } from './ss.js';

const random = (array) => {
  const newarray = array;
  for (let i = newarray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newarray[i];
    newarray[i] = array[j];
    newarray[j] = temp;
  }
  return array;
};

export const insert = new ValidatedMethod({
  name: 'ss.insert',
  validate: new SimpleSchema({
    person: { type: String },
  }).validator(),
  run({ person }) {
    SS.insert({ firstname: person, ss: 'none' });
  },
});

export const getName = new ValidatedMethod({
  name: 'ss.getname',
  validate: new SimpleSchema({
    person: { type: String },
  }).validator(),
  run({ person }) {
    if (Meteor.isServer) {
      const giver = SS.findOne({ firstname: person });
      const secret = SS.findOne({ _id: giver.ss });
      return secret.firstname;
    }
    return '';
  },
});


export const assign = new ValidatedMethod({
  name: 'ss.assign',
  validate: null,
  run() {
    const all = SS.find().fetch();
    const randomized = random(all);
    for (let i = 0; i < randomized.length; i++) {
      SS.update({ _id: randomized[i]._id }, { $set: { ss: randomized[(i + 1) % randomized.length]._id } });
    }
  },
});

const PEOPLE_METHODS = _.pluck([
  insert,
  getName,
  assign,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(PEOPLE_METHODS, name);
    },
    coonnectionId() { return true; },
  }, 5, 1000);
}
